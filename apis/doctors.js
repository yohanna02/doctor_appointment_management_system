"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctorsController_1 = require("../controllers/doctorsController");
const validator_1 = __importDefault(require("../utils/validator"));
const validatorSchema_1 = require("../utils/validatorSchema");
const authenication_1 = __importDefault(require("../middlewares/authenication"));
const router = (0, express_1.Router)();
router.post("/sign-up", (req, res, next) => {
    const { error } = (0, validator_1.default)(validatorSchema_1.doctorsSignupSchema)(req.body);
    if (error)
        return res.status(422).json(error.details);
    next();
}, doctorsController_1.signup);
router.post("/login", (req, res, next) => {
    const { error } = (0, validator_1.default)(validatorSchema_1.doctorLoginSchema)(req.body);
    if (error)
        return res.status(422).json(error.details);
    next();
}, doctorsController_1.login);
router.get("/info", authenication_1.default, doctorsController_1.doctorInfo);
router.get("/get-all-doctors", doctorsController_1.getAllDoctorsInfo);
exports.default = router;
