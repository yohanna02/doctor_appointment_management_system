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
exports.agenda = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const agenda_1 = __importDefault(require("agenda"));
const doctors_1 = __importDefault(require("./apis/doctors"));
const appointments_1 = __importDefault(require("./apis/appointments"));
const appointmentJobs_1 = __importDefault(require("./jobs/appointmentJobs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.connect("mongodb+srv://yohanna02:bbPSTFu3NkHTfoB6fgK8@cluster0.joi010b.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
    console.log("Connected to mongodb server successfully");
}).catch((err) => {
    throw err;
});
exports.agenda = new agenda_1.default({ db: { address: "mongodb://localhost:27017/docter_appointment_management_system" } });
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, appointmentJobs_1.default)(exports.agenda);
        yield exports.agenda.start();
    });
})();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/doctor", doctors_1.default);
app.use("/api/v1/appointment", appointments_1.default);
app.use((req, res) => {
    res.send("<h1>NOT FOUND</h1>");
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
