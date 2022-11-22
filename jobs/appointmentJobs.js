"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleSmsReminder = exports.scheduleEmailReminder = exports.scheduleAppointment = void 0;
const app_1 = require("../app");
const appointmentsModel_1 = __importDefault(require("../models/appointmentsModel"));
const doctorsModel_1 = __importDefault(require("../models/doctorsModel"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
var JobDefination;
(function (JobDefination) {
    JobDefination["EMAIL_APPOINMENT_REMINDER"] = "EMAIL_APPOINMENT_REMINDER";
    JobDefination["SMS_APPOINTMENT_REMINDER"] = "SMS_APPOINTMENT_REMINDER";
    JobDefination["START_DOCTORS_APPOINMENT"] = "START_DOCTORS_APPOINMENT";
    JobDefination["STOP_DOCTORS_APPOINMENT"] = "STOP_DOCTORS_APPOINMENT";
})(JobDefination || (JobDefination = {}));
;
const getClockTime = (day, date) => {
    const d = new Date(date);
    let hour = d.getHours();
    let minute = d.getMinutes();
    let ap = "am";
    if (hour > 11) {
        ap = "pm";
    }
    if (hour > 12) {
        hour = hour - 12;
    }
    if (hour === 0) {
        hour = 12;
    }
    if (hour < 10) {
        hour = hour;
    }
    return `${day} at ${hour}:${minute}${ap}`;
};
const scheduleAppointment = (days, startTime, endTime, doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    days.forEach((day) => __awaiter(void 0, void 0, void 0, function* () {
        const jobStartTime = getClockTime(day, startTime);
        const jobStopTime = getClockTime(day, endTime);
        yield app_1.agenda.schedule(jobStartTime, JobDefination.START_DOCTORS_APPOINMENT, { _id: doctorId, jobStartTime });
        yield app_1.agenda.schedule(jobStopTime, JobDefination.STOP_DOCTORS_APPOINMENT, { _id: doctorId, jobStopTime });
    }));
});
exports.scheduleAppointment = scheduleAppointment;
const scheduleEmailReminder = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const appointmentTime = new Date(appointment.date);
    if (now.getHours() === appointmentTime.getHours() || now.getHours() > appointmentTime.getHours())
        return;
    appointmentTime.setHours(appointmentTime.getHours() - 1); // minus 1 hour from the appointment time
    app_1.agenda.schedule(appointmentTime, JobDefination.EMAIL_APPOINMENT_REMINDER, { appointment });
});
exports.scheduleEmailReminder = scheduleEmailReminder;
const scheduleSmsReminder = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const appointmentTime = new Date(appointment.date);
    if (now.getHours() === appointmentTime.getHours() || now.getHours() > appointmentTime.getHours())
        return;
    appointmentTime.setHours(appointmentTime.getMinutes() - 30); // minus 30 minute from the appointment time
    app_1.agenda.schedule(appointmentTime, JobDefination.SMS_APPOINTMENT_REMINDER, { appointment });
});
exports.scheduleSmsReminder = scheduleSmsReminder;
const initAppointmentJob = (agenda) => {
    agenda.define(JobDefination.EMAIL_APPOINMENT_REMINDER, (job) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { email, doctorId, appointmentId, personName } = (_a = job.attrs.data) === null || _a === void 0 ? void 0 : _a.appointment;
        const doctor = yield doctorsModel_1.default.findById(doctorId);
        if (!doctor)
            return;
        const mailBody = `
            <p>Hello, ${personName}</p>
            <p>Your appointment with doctor ${doctor.name} is in 1 Hour.</p>
            <p>This is your appointment ID: <b style="color: red;">${appointmentId}</b></p>
            <p>Thank you. 👍🏽</p>
        `;
        yield (0, sendMail_1.default)(email, "Appointment Reminder", mailBody);
    }));
    agenda.define(JobDefination.SMS_APPOINTMENT_REMINDER, (job) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        console.log(job.attrs.data);
        const { email, doctorId, appointmentId, personName } = (_b = job.attrs.data) === null || _b === void 0 ? void 0 : _b.appointment;
        const doctor = yield doctorsModel_1.default.findById(doctorId);
        if (!doctor)
            return;
        const mailBody = `
            <p>Hello, ${personName}</p>
            <p>Your appointment with doctor ${doctor.name} is in 30 Minutes.</p>
            <p>This is your appointment ID: <b style="color: red;">${appointmentId}</b></p>
            <p>Thank you. 👍🏽</p>
        `;
        yield (0, sendMail_1.default)(email, "Appointment Reminder", mailBody);
    }));
    agenda.define(JobDefination.START_DOCTORS_APPOINMENT, (job) => __awaiter(void 0, void 0, void 0, function* () {
        if (job.attrs.data) {
            const doctor = yield doctorsModel_1.default.findById(job.attrs.data._id);
            if (doctor) {
                doctor.makeAppointment = true;
                doctor.save();
            }
            job.repeatAt(`next week ${job.attrs.data.jobStartTime}`);
            yield job.save();
        }
    }));
    agenda.define(JobDefination.STOP_DOCTORS_APPOINMENT, (job) => __awaiter(void 0, void 0, void 0, function* () {
        if (job.attrs.data) {
            const doctor = yield doctorsModel_1.default.findById(job.attrs.data._id);
            if (doctor) {
                doctor.makeAppointment = false;
                doctor.save();
            }
            job.repeatAt(`next week ${job.attrs.data.jobStopTime}`);
            yield job.save();
            const doctorsAppointment = yield appointmentsModel_1.default.find({ doctorId: doctor === null || doctor === void 0 ? void 0 : doctor._id });
            doctorsAppointment.forEach((appointment) => __awaiter(void 0, void 0, void 0, function* () {
                appointment.done = false;
                yield appointment.save();
            }));
        }
    }));
};
exports.default = initAppointmentJob;
