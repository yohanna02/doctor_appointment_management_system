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
exports.getAllDoctorsInfo = exports.doctorInfo = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const doctorsModel_1 = __importDefault(require("../models/doctorsModel"));
const appointmentJobs_1 = require("../jobs/appointmentJobs");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, speciality, appointmentDays, availableTimeStart, availableTimeEnd, email, password } = req.body;
        const emailExist = yield doctorsModel_1.default.findOne({ email });
        if (emailExist) {
            return res.status(422).json({
                status: "duplicate",
                msg: `${email} has already been registered`
            });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newDoctor = new doctorsModel_1.default({
            name,
            speciality,
            appointmentDays,
            availableTimeStart,
            availableTimeEnd,
            email,
            password: hashedPassword
        });
        yield newDoctor.save();
        const doctor = yield doctorsModel_1.default.findOne({ email });
        if (doctor) {
            yield (0, appointmentJobs_1.scheduleAppointment)(appointmentDays, availableTimeStart, availableTimeEnd, doctor === null || doctor === void 0 ? void 0 : doctor._id);
        }
        res.json({
            status: "OK",
            msg: "Account created successfully, Pls login"
        });
    }
    catch (err) {
        // res.status(500).json({ msg: "An error occured, Try again later!" });
        res.status(500).json(err);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const doctor = yield doctorsModel_1.default.findOne({ email });
        if (!doctor)
            return res.status(422).json({ msg: "Email or Password not correct" });
        const isPassword = yield bcryptjs_1.default.compare(password, doctor.password);
        if (!isPassword)
            return res.status(401).json({ msg: "Email or Password not correct" });
        const token = jsonwebtoken_1.default.sign({ _id: doctor._id }, process.env.JWT_STRATEGY_SERECT, { expiresIn: "5h" });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ msg: "An error occured, Try again later!" });
    }
});
exports.login = login;
const doctorInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorInfo = {
            _id: res.locals._id,
            email: res.locals.email,
            name: res.locals.name,
            speciality: res.locals.speciality,
            appointmentDays: res.locals.appointmentDays,
            availableTimeStart: res.locals.availableTimeStart,
            availableTimeEnd: res.locals.availableTimeEnd
        };
        res.json(doctorInfo);
    }
    catch (err) {
        res.status(500).json({ msg: "An error occured, Try again later!" });
        // res.status(500).json(err);
    }
});
exports.doctorInfo = doctorInfo;
const getAllDoctorsInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield doctorsModel_1.default.find();
        // const filteredDoctors = doctors.filter(doctor => {
        //     return doctor.makeAppointment === true;
        // });
        const formattedDoctors = doctors.map(doctor => {
            return {
                _id: doctor._id,
                name: doctor.name,
                speciality: doctor.speciality,
                appointmentDays: doctor.appointmentDays,
                availableTimeStart: doctor.availableTimeStart,
                availableTimeEnd: doctor.availableTimeEnd,
                email: doctor.email
            };
        });
        res.json(formattedDoctors);
    }
    catch (err) {
        res.status(500).json({ msg: "An error occured, Try again later!" });
        // res.status(500).json(err);
    }
});
exports.getAllDoctorsInfo = getAllDoctorsInfo;
