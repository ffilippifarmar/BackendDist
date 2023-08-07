const nodemailer = require('nodemailer');
const aws = require("@aws-sdk/client-ses");
require('dotenv').config();


const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "us-east-1", // Your region will need to be updated
  credentials: {
    accessKeyId: process.env.SMTPAK,
    secretAccessKey: process.env.SMTPSK,
  },
});

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

const sendMail = async (email, subject, text) => {
  // send mail
  body = `<h1>Password Reset</h1>
        <h2>Hello Friend</h2>
        <p>Reset your password by clicking on the following link within 15 minutes.</p>
        
        <a href=${text}> Click here</a>
        <p>This email is auto generated, please do not reply to this email.</p>
        `;
  transporter.sendMail(
      // mail options
      
      {
        from: "calmzonearg@gmail.com", // replace with your own address
        to: "calmzonearg@gmail.com", // replace with your own address
        subject: "Testing my Nodemailer/SES setup",
        html: body,
      },
      // callback
      (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.messageId);
        }
      }
    );
};

module.exports = sendMail;