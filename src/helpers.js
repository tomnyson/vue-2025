"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "",
        pass: "",
    },
});
/**
 *  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });
 */
export const sendMail = async (to, subject = "demo", content) => {
    const info = await transporter.sendMail({
        from: '"info" <tabletkindfire@gmail.com>',
        to: to,
        subject: subject,
        html: content, // HTML body
    });
}