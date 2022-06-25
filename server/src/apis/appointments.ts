import { Router, Request, Response, NextFunction } from "express";
import { createAppoinment } from "../controllers/appointmentsController";
import validator from "../utils/validator";
import { appoinmentSchema } from "../utils/validatorSchema";

const router = Router();

router.post("/make-appointment", (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(appoinmentSchema)(req.body);

    if (error)
        return res.status(422).json(error.details);

    next();
}, createAppoinment);

export default router;