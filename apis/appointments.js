"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsController_1 = require("../controllers/appointmentsController");
const authenication_1 = __importDefault(require("../middlewares/authenication"));
const validator_1 = __importDefault(require("../utils/validator"));
const validatorSchema_1 = require("../utils/validatorSchema");
const router = (0, express_1.Router)();
router.post("/make-appointment", (req, res, next) => {
    const { error } = (0, validator_1.default)(validatorSchema_1.appoinmentSchema)(req.body);
    if (error)
        return res.status(422).json(error.details);
    next();
}, appointmentsController_1.createAppoinment);
router.get("/get-all-appointments", authenication_1.default, appointmentsController_1.getAllAppointments);
router.get("/get-appointment", appointmentsController_1.getSingleAppointment);
router.post("/update-progress", authenication_1.default, appointmentsController_1.updateProgress);
exports.default = router;
