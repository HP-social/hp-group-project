const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const transporter = nodemailer.createTransport(
  sesTransport({
    accessKeyId: `${process.env.ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`
  })
);

module.exports = {
  sendEmail1: (req, res, next) => {
    console.log('@#$%#@ EMAIL 1 HIT');
    // console.log("NODEMAILER >>>>", req.body);
    // console.log(typeof(process.env.ADMIN_EMAIL));
    // const { forum, user_email, emailMessage } = req.body.e;
    // transporter
    //   .sendMail({
    //     from: process.env.ADMIN_EMAIL,
    //     to: user_email,
    //     subject: `${forum} Password Has Changed`,
    //     text: emailMessage
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     res.status(500).send(err);
    //   });
  },

  sendEmail2: (req, res, next) => {
    // console.log('****sendmail2 ***', req.body.e.obj.user_email);
    console.log('****sendmail2 ***');
    // const { emailMessage } = req.body.e;
    // const { first_name, user_email } = req.body.e.obj;
    // transporter
    //   .sendMail({
    //     from: process.env.ADMIN_EMAIL,
    //     to: user_email,
    //     subject: `${first_name}, Your Zoomie Order Completed`,
    //     text: emailMessage
    //   })
    //   .then(response => res.status(200).send('Cool it works'))
    //   .catch(err => {
    //     console.log(err);
    //     res.status(500).send(err);
    //   });
  }
};

//****ETHANS WAY ****
// const nodemailer = require("nodemailer");

// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.PROJECT_ADMIN_EMAIL,
//     pass: process.env.ADMIN_GMAIL_PASSWORD
//   }
// });

// let mailOptions = {
//   from: process.env.PROJECT_ADMIN_EMAIL,
//   to: user_email,
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
