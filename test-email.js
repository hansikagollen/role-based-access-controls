const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.sendMail({
  from: `"Test" <${process.env.EMAIL_USER}>`,
  to: 'your_email@gmail.com',
  subject: 'Test Email',
  html: '<p>This is a test email!</p>'
}, (err, info) => {
  if (err) {
    return console.error('Error sending test email:', err);
  }
  console.log('✅ Test email sent:', info.response);
});
