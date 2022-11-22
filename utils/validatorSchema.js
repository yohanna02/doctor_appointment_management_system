"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appoinmentSchema = exports.doctorLoginSchema = exports.doctorsSignupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.doctorsSignupSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    speciality: joi_1.default.string().required(),
    appointmentDays: joi_1.default.array().items(joi_1.default.string().valid("sunday").valid("monday").valid("tuesday").valid("wednesday").valid("thursday").valid("friday").valid("saturday")).min(1).max(7),
    availableTimeStart: joi_1.default.date().required(),
    availableTimeEnd: joi_1.default.date().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required()
});
exports.doctorLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required()
});
exports.appoinmentSchema = joi_1.default.object({
    personName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phoneNo: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    reason: joi_1.default.string().required(),
    doctorId: joi_1.default.string().required()
});
