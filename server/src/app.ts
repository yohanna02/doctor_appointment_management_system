import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Agenda from "agenda";

import doctorsApi from "./apis/doctors";
import appointmentApi from "./apis/appointments";

import initAppointmentJob from "./jobs/appointmentJobs";

dotenv.config();

const app = express();

mongoose.connect("mongodb+srv://yohanna02:bbPSTFu3NkHTfoB6fgK8@cluster0.joi010b.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to mongodb server successfully");
}).catch((err) => {
    throw err;
});

export const agenda = new Agenda({ db: { address: "mongodb+srv://yohanna02:bbPSTFu3NkHTfoB6fgK8@cluster0.joi010b.mongodb.net/?retryWrites=true&w=majority" } });
(async function () {
    initAppointmentJob(agenda);
    await agenda.start();
})();

app.use(express.json());
app.use(cors());

app.use("/api/v1/doctor", doctorsApi);
app.use("/api/v1/appointment", appointmentApi);

app.use((req, res) => {
    res.send("<h1>NOT FOUND</h1>");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});