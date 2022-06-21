import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import doctorsApi from "./apis/doctors";

dotenv.config();

const app = express();

mongoose.connect(process.env.DB_CONNECT || "")
.then(() => {
    console.log("Connected to mongodb server successfully");
}).catch((err) => {
    throw err;
});

app.use(express.json());
app.use(cors());

app.use("/api/v1/doctor", doctorsApi);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});