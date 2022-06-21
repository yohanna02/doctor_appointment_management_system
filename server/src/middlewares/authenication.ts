import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import doctorsModel, {Doctors} from "../models/doctorsModel";
dotenv.config();

const isAuth = async (req: Request, res: Response<any, Doctors>, next: NextFunction) => {
    try {
        if (!req.headers.authorization) throw new Error("Error");
        
        const [word, token] = req.headers.authorization.split(' ');
        if (word !== "Bearer") return res.status(401).json({ msg: "unAuthorize" });
        const decoded: jwt.JwtPayload = jwt.verify(token, process.env.JWT_STRATEGY_SERECT as string) as jwt.JwtPayload;
        
        const doctor = await doctorsModel.findById(decoded._id);
        if (!doctor) return res.status(401).json({ msg: "unAuthorize" });

        res.locals = doctor;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "unAuthorize" });
    }
};
export default isAuth;
