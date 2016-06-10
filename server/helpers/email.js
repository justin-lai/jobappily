const nodemailer = require('nodemailer');
// const router = require('express').Router();

module.exports = (userEmail, eventDetails) => {

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'jobappilyservices@gmail.com', // Your email id
      pass: 'applytoallofthethings' // Your password
    }
  });

  const mailOptions = {
    from: 'JobAppily<jobappilyservices@gmail.com>', // sender address
    to: userEmail, // list of receivers
    subject: 'Event Reminder', // Subject line
    text: `Here's a friendly reminder about your scheduled event on ${eventDetails.start}.` //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error){
      console.log(error);
    } else {
      console.log('Message sent: ' + info.response);
    }
  });
};
