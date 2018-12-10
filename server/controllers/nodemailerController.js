const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const transporter = nodemailer.createTransport(
  sesTransport({
    // ASK PAT FOR ENV FILE
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  })
);

module.exports = {
  sendEmail1: (req, res, next) => {
    console.log("NODEMAILER >>>>", req.body.passphrase);
    // console.log(typeof(process.env.ADMIN_EMAIL));
    // console.log(process.env.ADMIN_EMAIL);
    const { passphrase } = req.body;
    transporter
      .sendMail({
        from: process.env.ADMIN_EMAIL,
        to: 'pskhiev@gmail.com',
        subject: "House (Insert) Phrase Has Changed",
        text: `Your House passphrase was compromised. The new passphrase is ${passphrase}`
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  sendEmail2: (req, res, next) => {
    // console.log('****sendmail2 ***', req.body.e.obj.user_email);
    // console.log('****sendmail2 ***');
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
