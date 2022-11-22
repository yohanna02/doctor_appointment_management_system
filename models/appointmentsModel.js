"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const appointmentSchema = new mongoose_1.Schema({
    personName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    doctorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    appointmentId: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    doctorsNote: String
});
const appointmentModel = (0, mongoose_1.model)("appointment", appointmentSchema);
exports.default = appointmentModel;
