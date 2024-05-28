const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const url = `${process.env.CLIENT_URL}/verify/${token}`;

        await transporter.sendMail({
            to: user.email,
            subject: 'Verify your email',
            html: `Click <a href="${url}">here</a> to verify your email.`
        });

        res.status(201).send('Registration successful. Please check your email for verification.');
    } catch (error) {
        res.status(500).json({ error: 'Error registering new user.' });
    }
};

const verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).send('Invalid token.');
        }
        user.isVerified = true;
        await user.save();
        res.send('Email verified successfully.');
    } catch (error) {
        res.status(400).send('Email verification failed.');
    }
};

router.post('/register', register);
router.get('/verify/:token', verifyEmail);

module.exports = { register, verifyEmail };
