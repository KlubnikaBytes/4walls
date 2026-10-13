require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify SMTP connection on startup so Render logs show exact status
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter verification failed:', error.message);
  } else {
    console.log('Email transporter is ready and authenticated successfully');
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: '4Walls backend is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.post('/api/consultation', async (req, res) => {
  const { name, email, phone, interest, message } = req.body;
  
  try {
    transporter.sendMail({
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
    }).then(info => {
      console.log('Email sent successfully:', info.messageId);
    }).catch(error => {
      console.error('Render Email Send Error:', error);
    });

    res.status(200).json({ success: true, message: 'Consultation request received successfully.' });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
