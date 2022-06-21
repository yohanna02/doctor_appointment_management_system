import { Request, Response } from "express"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import doctorsModel, { Doctors } from "../models/doctorsModel"

export const signup = async (req: Request<any, any, Doctors>, res: Response) => {
    try {
        const {
            name,
            speciality,
            appointmentDays,
            availableTimeStart,
            availableTimeEnd,
            email,
            password
        } = req.body;

        const emailExist = await doctorsModel.findOne({ email });

        if (emailExist) {
            return res.status(422).json({
                status: "duplicate",
                msg: `${email} has already been registered`
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newDoctor = new doctorsModel({
            name,
            speciality,
            appointmentDays,
            availableTimeStart,
            availableTimeEnd,
            email,
            password: hashedPassword
        });

        await newDoctor.save();

        res.json({
            status: "OK",
            msg: "Account created successfully, Pls login"
        });
    } catch (err) {
        res.status(500).json(err);
    }
}

export const login = async (req: Request<any, any, { email: string, password: string }>, res: Response) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorsModel.findOne({ email });
        if (!doctor)
            return res.status(422).json({ msg: "Email or Password not correct" });

        const isPassword = await bcrypt.compare(password, doctor.password);
        if (!isPassword)
            return res.status(401).json({ msg: "Email or Password not correct" });

        const token = jwt.sign(
            { _id: doctor._id },
            process.env.JWT_STRATEGY_SERECT as string,
            { expiresIn: "5h" }
        );
        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: "An error occured, Try again later!" });
    }
};