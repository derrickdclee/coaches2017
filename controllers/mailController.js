const mail = require('../handlers/mail');

exports.sendMail = async (req, res) => {
  try {
    await mail.send({
      subject: 'Q&A',
      from: req.body.emailAddress,
      text: req.body.emailBody
    });
  } catch (err) {
    console.log(err);
  }

  res.redirect('/');
};
