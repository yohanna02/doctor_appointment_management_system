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
exports.updateProgress = exports.getSingleAppointment = exports.getAllAppointments = exports.createAppoinment = void 0;
const randomstring_1 = __importDefault(require("randomstring"));
const appointmentJobs_1 = require("../jobs/appointmentJobs");
const appointmentsModel_1 = __importDefault(require("../models/appointmentsModel"));
const doctorsModel_1 = __importDefault(require("../models/doctorsModel"));
const getWeekDayAsNum = (day) => {
    switch (day) {
        case "sunday":
            return 0;
        case "monday":
            return 1;
        case "tuesday":
            return 2;
        case "wednesday":
            return 3;
        case "thursday":
            return 4;
        case "friday":
            return 5;
        case "saturday":
            return 6;
    }
};
const createAppoinment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { personName, email, phoneNo, date, reason, doctorId } = req.body;
        const appointmentDate = new Date(date);
        const doctor = yield doctorsModel_1.default.findById(doctorId);
        if (!doctor)
            return res.status(422).json({ status: "Invalid ID", msg: "Doctors ID not found" });
        const doctorStartTime = new Date(doctor.availableTimeStart);
        const doctorEndTime = new Date(doctor.availableTimeEnd);
        const appointmentDay = doctor.appointmentDays.map(day => getWeekDayAsNum(day));
        const [Day] = appointmentDay.filter(day => day === appointmentDate.getDay());
        if (Day !== appointmentDate.getDay()) {
            return res.status(422).json({
                status: "not-allowed",
                msg: "Can't make an appointment on this day"
            });
        }
        // doctorStartTime.setFullYear(appointmentDate.getFullYear());
        // doctorStartTime.setMonth(appointmentDate.getMonth());
        // doctorStartTime.setDate(appointmentDate.getDate());
        // doctorEndTime.setFullYear(appointmentDate.getFullYear());
        // doctorEndTime.setMonth(appointmentDate.getMonth());
        // doctorEndTime.setDate(appointmentDate.getDate() + 1);
        // console.log([appointmentDate, doctorStartTime, doctorEndTime]);
        // const now = new Date().getTime();
        // if (
        //     appointmentDate.getTime() < doctorStartTime.getTime() ||
        //     appointmentDate.getTime() > doctorEndTime.getTime() ||
        //     appointmentDate.getTime() < now
        // ) {
        //     return res.status(422).json({
        //         status: "not-allowed",
        //         msg: "Can't make an appointment on this time"
        //     });
        // }
        const newAppoinment = new appointmentsModel_1.default({
            personName,
            email,
            phoneNo,
            date,
            reason,
            doctorId,
            appointmentId: randomstring_1.default.generate({
                length: 5,
                charset: "alphanumeric"
            })
        });
        const savedAppointment = yield newAppoinment.save();
        yield (0, appointmentJobs_1.scheduleEmailReminder)(savedAppointment);
        res.json({ status: "OK", msg: "Appointment Create successfully" });
    }
    catch (err) {
        res.status(500).json({ msg: "An error occured, Try again later!" });
        // res.status(500).json(err);
    }
});
exports.createAppoinment = createAppoinment;
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAppointments = yield appointmentsModel_1.default.find({ doctorId: req.query.doctorId });
        res.json(allAppointments);
    }
    catch (err) {
        res.status(500).json({ msg: "An error occured, Try again later!" });
        // res.status(500).json(err);
    }
});
exports.getAllAppointments = getAllAppointments;
const getSingleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointmentsModel_1.default.findOne({ appointmentId: req.query.appointmentId });
        res.json(appointment);
    }
    catch (err) {
        res.status(500).json({ msg: "An error occured, Try again later!" });
        // res.status(500).json(err);
    }
});
exports.getSingleAppointment = getSingleAppointment;
const updateProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointmentsModel_1.default.findOneAndUpdate({ appointmentId: req.body.appointmentId }, { done: true, doctorsNote: req.body.doctorsNote });
        if (!appointment)
            return res.status(422).json({ status: "Invalid Id", msg: "Could't find appointment Id" });
        res.json({ status: "OK", msg: "Saved" });
    }
    catch (err) {
        res.status(500).json({ msg: "An error occured, Try again later!" });
        // res.status(500).json(err);
    }
});
exports.updateProgress = updateProgress;
