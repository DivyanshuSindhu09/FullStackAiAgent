import nodemailer from "nodemailer";

export const sendMail = async (to, text, subject) => {
    try {
        const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        },
        });

        const info = await transporter.sendMail({
        from: '"Divyanshu Sindhu" <diyanshu.sindhu@gmail.com>',
        to,
        subject,
        text, // plain‑text body
        html: "<b>Hello world?</b>", // HTML body
    });

        console.log("Message was sent!", info.messageId)
        return info
    } catch (error) {
        console.error("Error from nodemailer!")
        throw error
    }
}