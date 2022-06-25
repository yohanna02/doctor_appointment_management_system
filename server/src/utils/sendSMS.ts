import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendSMS = async (to: string, message: string) => {
    return await client.messages
        .create({
            body: message,
            from: process.env.PHONE_NO,
            to
        });
}

export default sendSMS;
