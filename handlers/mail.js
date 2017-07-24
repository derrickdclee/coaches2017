const postmark = require('postmark');

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
