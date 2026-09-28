require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.post('/api/consultation', async (req, res) => {
  const { name, email, phone, interest, message } = req.body;
  
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Consultation Request: ${interest}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Interest: ${interest}

Message:
${message}
      `,
    });

    res.status(200).json({ success: true, message: 'Consultation request received successfully.' });
  } catch (error) {
    console.error('Render Email Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
