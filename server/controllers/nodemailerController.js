const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const transporter = nodemailer.createTransport(
  sesTransport({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  })
);

module.exports = {
  sendEmail1: (req, res, next) => {
    console.log('NODEMAILER >>>>', req.body);
    // console.log(typeof(process.env.ADMIN_EMAIL));
    // console.log(process.env.ADMIN_EMAIL);
    const { passphrase, houseStudents } = req.body;
    transporter
      .sendMail({
        from: process.env.ADMIN_EMAIL,
        to: houseStudents,
        subject: `House ${req.session.user.house} Phrase Has Changed`,
        text: `Your House passphrase was compromised. The new passphrase is ${passphrase}`
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  sendEmail2: (req, res, next) => {},
  getHouseEmails: (req, res, next) => {
    req.app
      .get('db')
      .query(`select * from wizards where house=$1`, `${req.query.house}`)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => res.status(500).send(err));
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
