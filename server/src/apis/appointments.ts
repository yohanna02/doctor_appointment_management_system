import { Router, Request, Response, NextFunction } from "express";
import { createAppoinment, getAllAppointments, getSingleAppointment, updateProgress } from "../controllers/appointmentsController";
import isAuth from "../middlewares/authenication";
import validator from "../utils/validator";
import { appoinmentSchema } from "../utils/validatorSchema";

const router = Router();

router.post("/make-appointment", (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(appoinmentSchema)(req.body);

    if (error)
        return res.status(422).json(error.details);

    next();
}, createAppoinment);

router.get("/get-all-appointments", isAuth, getAllAppointments);

router.get("/get-appointment", getSingleAppointment);

router.post("/update-progress", isAuth, updateProgress);

export default router;