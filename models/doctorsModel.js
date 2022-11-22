"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const doctorsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    appointmentDays: [],
    availableTimeStart: {
        type: Date,
        required: true
    },
    availableTimeEnd: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    makeAppointment: {
        type: Boolean,
        default: false
    }
});
const doctorsModel = (0, mongoose_1.model)("doctor", doctorsSchema);
exports.default = doctorsModel;
