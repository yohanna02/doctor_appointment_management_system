import { Schema, model } from "mongoose";

export interface Appointment {
    personName: string;
    email: string;
    phoneNo: string;
    date: Date;
    reason: string;
    doctorId: Schema.Types.ObjectId;
    appointmentId: string;
    done: boolean;
    doctorsNote: string;
};

const appointmentSchema = new Schema<Appointment>({
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
        type: Schema.Types.ObjectId,
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

const appointmentModel = model<Appointment>("appointment", appointmentSchema);

export default appointmentModel;