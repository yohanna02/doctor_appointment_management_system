import { Request, Response } from "express";
import { Schema } from "mongoose";
import randomstring from "randomstring";

import { scheduleEmailReminder } from "../jobs/appointmentJobs";
import appoinmentsModel from "../models/appointmentsModel";
import doctorsModel, { appointmentDays } from "../models/doctorsModel";

interface NewAppointment {
    personName: string;
    email: string;
    phoneNo: string;
    date: Date;
    reason: string;
    doctorId: Schema.Types.ObjectId;
}

const getWeekDayAsNum = (day: appointmentDays) => {
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
}

export const createAppoinment = async (req: Request, res: Response) => {
    try {
        const { personName, email, phoneNo, date, reason, doctorId } = req.body as NewAppointment;

        const appointmentDate = new Date(date);
        const doctor = await doctorsModel.findById(doctorId);

        if (!doctor) return res.status(422).json({ status: "Invalid ID", msg: "Doctors ID not found" });

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

        const newAppoinment = new appoinmentsModel({
            personName,
            email,
            phoneNo,
            date,
            reason,
            doctorId,
            appointmentId: randomstring.generate({
                length: 5,
                charset: "alphanumeric"
            })
        });

        const savedAppointment = await newAppoinment.save();

        await scheduleEmailReminder(savedAppointment);

        res.json({status: "OK", msg: "Appointment Create successfully"});

    } catch (err) {
        res.status(500).json({ msg: "An error occured, Try again later!" });
        // res.status(500).json(err);
    }
}

export const getAllAppointments = async (req: Request<any, any, any, { doctorId: string }>, res: Response) => {
    try {
        const allAppointments = await appoinmentsModel.find({ doctorId: req.query.doctorId });

        res.json(allAppointments);
    } catch (err) {
        res.status(500).json({ msg: "An error occured, Try again later!" });
        // res.status(500).json(err);
    }
}

export const getSingleAppointment = async (req: Request<any, any, any, { appointmentId: string }>, res: Response) => {
    try {
        const appointment = await appoinmentsModel.findOne({ appointmentId: req.query.appointmentId });

        res.json(appointment);
    } catch (err) {
        res.status(500).json({ msg: "An error occured, Try again later!" });
        // res.status(500).json(err);
    }
}

export const updateProgress = async (req: Request<any, { appointmentId: string, doctorsNote: string }>, res: Response) => {
    try {
        const appointment = await appoinmentsModel.findOneAndUpdate(
            { appointmentId: req.body.appointmentId }, 
            { done: true, doctorsNote: req.body.doctorsNote }
        );

        if (!appointment)
            return res.status(422).json({status: "Invalid Id", msg: "Could't find appointment Id"});

        res.json({status: "OK", msg: "Saved"});
    } catch (err) {
        res.status(500).json({ msg: "An error occured, Try again later!" });
        // res.status(500).json(err);
    }
}