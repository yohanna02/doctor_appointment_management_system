import { Agenda, Job } from "agenda";
import mongoose from "mongoose";
import { agenda } from "../app";
import { Appointment } from "../models/appointmentsModel";
import doctorsModel, { appointmentDays, Doctors } from "../models/doctorsModel";
import sendMail from "../utils/sendMail";

enum JobDefination {
    APPOINMENT_REMINDER = "APPOINMENT_REMINDER",
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
    const timeString = `${day} at ${hour}:${minute}${ap}`;
    return timeString;
}

export const scheduleAppointment = async (
    days: appointmentDays[],
    startTime: Doctors["availableTimeStart"],
    endTime: Doctors["availableTimeEnd"],
    doctorId: mongoose.Types.ObjectId) => {

    days.forEach(async (day) => {
        console.log(day);
        await agenda.every(
            getClockTime(day, startTime),
            JobDefination.START_DOCTORS_APPOINMENT,
            { _id: doctorId }
        );

        await agenda.every(
            getClockTime(day, endTime),
            JobDefination.STOP_DOCTORS_APPOINMENT,
            { _id: doctorId }
        );
    });
}

const initAppointmentJob = (agenda: Agenda) => {
    agenda.define(JobDefination.APPOINMENT_REMINDER, async (job: Job) => {
        const { email, doctorId, appointmentId, personName } = job.attrs.data as Appointment;
        const doctor = await doctorsModel.findById(doctorId);

        if (!doctor) return;

        const mailBody = `
            <p>Hello, ${personName}</p>
            <p>Your appointment with doctor with ${doctor.name} is remaining 1 Hour.</p>
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
        }
    });

    agenda.define(JobDefination.STOP_DOCTORS_APPOINMENT, async (job: Job) => {
        if (job.attrs.data) {
            const doctor = await doctorsModel.findById(job.attrs.data._id);

            if (doctor) {
                doctor.makeAppointment = false;
                doctor.save();
            }
        }
    });
}

export default initAppointmentJob;
