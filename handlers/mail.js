const nodemailer = require('nodemailer');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');
const postmark = require('postmark');

// const transport = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS
//   }
// });
//
// exports.send = async (options) => {
//   const text = options.from + options.text;
//   const mailOptions = {
//     from: `Nabba Korea <engineering@nabba.co.kr>`,
//     to: options.from,
//     subject: options.subject,
//     html: text,
//     text: text
//   };
//   const sendMail = promisify(transport.sendMail, transport);
//   return sendMail(mailOptions);
// };

const client = new postmark.Client("7209514b-cc54-4c01-8194-d72313c18155");

exports.send = (options) => {
  const text = `${options.from} ${options.text}`;
  client.sendEmail({
    "From": "engineering@nabba.co.kr",
    "To": "engineering@nabba.co.kr",
    "Subject": "Q&A",
    "TextBody": text
  });
};
