require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up the nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/consultation', (req, res) => {
  const { name, email, phone, interest, message } = req.body;
  console.log('New consultation request received:', { name, email, phone, interest, message });
  
  // Send email in background (don't await) so the frontend feels instant
  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: `New Consultation Request: ${interest}`,
    text: `
You have received a new consultation request.

Name: ${name}
Email: ${email}
Phone: ${phone}
Interest: ${interest}

Message:
${message}
    `,
  }).catch(error => {
    console.error('Error sending email:', error);
  });

  res.status(200).json({ success: true, message: 'Consultation request received successfully.' });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
