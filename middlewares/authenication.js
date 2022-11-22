"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const doctorsModel_1 = __importDefault(require("../models/doctorsModel"));
dotenv_1.default.config();
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization)
            throw new Error("Error");
        const [word, token] = req.headers.authorization.split(' ');
        if (word !== "Bearer")
            return res.status(401).json({ msg: "unAuthorize" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_STRATEGY_SERECT);
        const doctor = yield doctorsModel_1.default.findById(decoded._id);
        if (!doctor)
            return res.status(401).json({ msg: "unAuthorize" });
        res.locals = doctor;
        next();
    }
    catch (err) {
        return res.status(401).json({ msg: "unAuthorize" });
    }
});
exports.default = isAuth;
