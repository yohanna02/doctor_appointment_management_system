import { Request, Response } from "express";
import { Schema } from "mongoose";

import appoinmentsModel from "../models/appointmentsModel";

interface NewAppointment {
    personName: string;
    email: string;
    phoneNo: string;
    date: Schema.Types.Date;
    reason: string;
    doctorId: Schema.Types.ObjectId;
}

export const createAppoinment = async (req: Request, res: Response) => {
    try {
        const { personName, email, phoneNo, date, reason, doctorId } = req.body as NewAppointment;
    } catch (err) {
        res.status(500).json({ msg: "An error occured, Try again later!" });
        // res.status(500).json(err);
    }
}