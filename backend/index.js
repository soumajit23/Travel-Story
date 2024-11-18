const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., images, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Setup Nodemailer transport for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // Example using Gmail, but you can use any service
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password'   // Replace with your email password or App Password (for Gmail)
    }
});

// Basic route to test server
app.get('/', (req, res) => {
    res.send('Travel Agency Backend is Running');
});

// Contact form route
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com', // sender address
        to: 'your-email@gmail.com',   // receiver address (your email or admin email)
        subject: 'New Contact Form Submission',
        text: `You have a new message from: ${name}\n\nEmail: ${email}\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send('Message sent successfully');
    });
});

// Tour inquiry form route
app.post('/tour-inquiry', (req, res) => {
    const { destination, people, checkin, checkout } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'your-email@gmail.com',
        subject: 'New Tour Inquiry',
        text: `New tour inquiry details:\n\nDestination: ${destination}\nNo. of People: ${people}\nCheck-in Date: ${checkin}\nCheck-out Date: ${checkout}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send('Inquiry sent successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
