import joi from "joi";
import { Doctors } from "../models/doctorsModel";

export const doctorsSignupSchema = joi.object<Doctors>({
    name: joi.string().required(),
    speciality: joi.string().required(),
    appointmentDays: joi.array().items(joi.string().valid("sunday").valid("monday").valid("tuesday").valid("wednesday").valid("thursday").valid("friday").valid("saturday")).min(1).max(7),
    availableTimeStart: joi.date().required(),
    availableTimeEnd: joi.date().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
});

export const doctorLoginSchema = joi.object<{email: string, password: string}>({
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
});