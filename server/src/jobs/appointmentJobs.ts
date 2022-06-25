import { Agenda, Job } from "agenda";
import mongoose from "mongoose";
import { agenda } from "../app";
import { Appointment } from "../models/appointmentsModel";
import doctorsModel, { appointmentDays, Doctors } from "../models/doctorsModel";
import sendMail from "../utils/sendMail";
import sendSMS from "../utils/sendSMS";

enum JobDefination {
    EMAIL_APPOINMENT_REMINDER = "EMAIL_APPOINMENT_REMINDER",
    SMS_APPOINTMENT_REMINDER = "SMS_APPOINTMENT_REMINDER",
    START_DOCTORS_APPOINMENT = "START_DOCTORS_APPOINMENT",
    STOP_DOCTORS_APPOINMENT = "STOP_DOCTORS_APPOINMENT"
};


const getClockTime = (day: string, date: Date) => {
    const d = new Date(date);
    let hour = d.getHours();
    let minute = d.getMinutes();
    let ap = "am";
    if (hour > 11) { ap = "pm"; }
    if (hour > 12) { hour = hour - 12; }
    if (hour === 0) { hour = 12; }
    if (hour < 10) { hour = hour; }
    
    return `${day} at ${hour}:${minute}${ap}`;
}

export const scheduleAppointment = async (
    days: appointmentDays[],
    startTime: Doctors["availableTimeStart"],
    endTime: Doctors["availableTimeEnd"],
    doctorId: mongoose.Types.ObjectId) => {

    days.forEach(async (day) => {
        const jobStartTime = getClockTime(day, startTime);
        const jobStopTime = getClockTime(day, endTime);

        await agenda.schedule(
            jobStartTime,
            JobDefination.START_DOCTORS_APPOINMENT,
            { _id: doctorId, jobStartTime }
        );

        await agenda.schedule(
            jobStopTime,
            JobDefination.STOP_DOCTORS_APPOINMENT,
            { _id: doctorId, jobStopTime }
        );
    });
}

export const scheduleEmailReminder = async (appointment: Appointment) => {
    const now = new Date();
    const appointmentTime = new Date(appointment.date);

    if (now.getHours() === appointmentTime.getHours() || now.getHours() > appointmentTime.getHours()) return;

    appointmentTime.setHours(appointmentTime.getHours() - 1); // minus 1 hour from the appointment time

    agenda.schedule(appointmentTime, JobDefination.EMAIL_APPOINMENT_REMINDER, { appointment });
}

export const scheduleSmsReminder = async (appointment: Appointment) => {
    const now = new Date();
    const appointmentTime = new Date(appointment.date);

    if (now.getHours() === appointmentTime.getHours() || now.getHours() > appointmentTime.getHours()) return;

    appointmentTime.setHours(appointmentTime.getMinutes() - 30); // minus 30 minute from the appointment time

    agenda.schedule(appointmentTime, JobDefination.SMS_APPOINTMENT_REMINDER, { appointment });
}

const initAppointmentJob = (agenda: Agenda) => {
    agenda.define(JobDefination.EMAIL_APPOINMENT_REMINDER, async (job: Job) => {
        const { email, doctorId, appointmentId, personName } = job.attrs.data?.appointment as Appointment;
        const doctor = await doctorsModel.findById(doctorId);

        if (!doctor) return;

        const mailBody = `
            <p>Hello, ${personName}</p>
            <p>Your appointment with doctor ${doctor.name} is in 1 Hour.</p>
            <p>This is your appointment ID: <b style="color: red;">${appointmentId}</b></p>
            <p>Thank you. 👍🏽</p>
        `;
        await sendMail(email, "Appointment Reminder", mailBody);
    });

    agenda.define(JobDefination.SMS_APPOINTMENT_REMINDER, async (job: Job) => {
        console.log(job.attrs.data);
        const { email, doctorId, appointmentId, personName } = job.attrs.data?.appointment as Appointment;
        const doctor = await doctorsModel.findById(doctorId);

        if (!doctor) return;

        const mailBody = `
            <p>Hello, ${personName}</p>
            <p>Your appointment with doctor ${doctor.name} is in 30 Minutes.</p>
            <p>This is your appointment ID: <b style="color: red;">${appointmentId}</b></p>
            <p>Thank you. 👍🏽</p>
        `;
        await sendMail(email, "Appointment Reminder", mailBody);
    });

    agenda.define(JobDefination.START_DOCTORS_APPOINMENT, async (job: Job) => {
        if (job.attrs.data) {
            const doctor = await doctorsModel.findById(job.attrs.data._id);

            if (doctor) {
                doctor.makeAppointment = true;
                doctor.save();
            }

            job.repeatAt(`next week ${job.attrs.data.jobStartTime}`);
            await job.save();
        }
    });

    agenda.define(JobDefination.STOP_DOCTORS_APPOINMENT, async (job: Job) => {
        if (job.attrs.data) {
            const doctor = await doctorsModel.findById(job.attrs.data._id);

            if (doctor) {
                doctor.makeAppointment = false;
                doctor.save();
            }

            job.repeatAt(`next week ${job.attrs.data.jobStopTime}`);
            await job.save();
        }
    });
}

export default initAppointmentJob;
