import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
    path: path.resolve(__dirname, "../../../.env")
});

async function sendEmail() {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER as string,
            pass: process.env.EMAIL_PASSWORD as string
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "chktlo003@myuct.ac.za",
        subject: "Test Email",
        text: "Hello from TypeScript"
    });

    console.log("Email sent!");
}

sendEmail().catch(console.error);