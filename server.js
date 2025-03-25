require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email Sending Route
app.post('/send-email', async (req, res) => {
    try {
        const { email, subject, message } = req.body;

        if (!email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Email Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            text: message
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
        res.status(200).json({ message: 'Email sent successfully' });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

// Root API Check
app.get('/', (req, res) => {
    res.send('Leather Works API is running smoothly 🚀');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
