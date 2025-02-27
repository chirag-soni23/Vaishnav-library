import nodemailer from 'nodemailer';

const sendEmail = async ({ email, subject, message }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: email,
        subject,
        text: message,
    });
};

export default sendEmail;
