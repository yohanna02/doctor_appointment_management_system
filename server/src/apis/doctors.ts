import { Router, Request, Response, NextFunction } from "express";
import { login, signup } from "../controllers/doctorsController";
import { Doctors } from "../models/doctorsModel";
import validator from "../utils/validator";
import { doctorsSignupSchema, doctorLoginSchema } from "../utils/validatorSchema";

const router = Router();

router.post("/sign-up", (req: Request<any, any, Doctors>, res: Response, next: NextFunction) => {

    const { error } = validator(doctorsSignupSchema)(req.body);
    if (error) return res.status(422).json(error.details);
    
    next();
}, signup);

router.post("/login", (req: Request<any, any, {email: string, password: string}>, res: Response, next: NextFunction) => {
    const { error } = validator(doctorLoginSchema)(req.body);
    if (error) return res.status(422).json(error.details);

    next();
}, login);

export default router;