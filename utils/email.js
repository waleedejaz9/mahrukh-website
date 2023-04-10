import nodemailer from "nodemailer";
import config from "../config.js";

var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "waleedejaz9@gmail.com",
    pass: "l1f16bscs0376",
  },
});

var mailOptions = {
  from: "test@yahoo.com",
  to: "myfriend@yahoo.com",
  subject: "Sending Email using Node.js",
  html: "",
};

const sendEmail = async (subject, from ,to, body) => {
  mailOptions.subject = subject;
  mailOptions.to = to;
  mailOptions.from = from;
  mailOptions.html = body;
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export { sendEmail };