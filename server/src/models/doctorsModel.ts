import { Schema, model } from "mongoose";

export type appointmentDays = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

export interface Doctors {
    name: string;
    speciality: string;
    appointmentDays: appointmentDays[];
    availableTimeStart: Date;
    availableTimeEnd: Date;
    email: string;
    password: string;
    makeAppointment: boolean;
};

const doctorsSchema = new Schema<Doctors>({
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

const doctorsModel = model<Doctors>("doctor", doctorsSchema);

export default doctorsModel;