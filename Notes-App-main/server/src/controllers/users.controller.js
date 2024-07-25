require('dotenv').config();
const User = require('../models/users.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function signup(req, res) {
    const userDetails = req.body;
    console.log('User Details:', userDetails);
    try {
        if (!userDetails) throw Error("User Details Missing");
        const { username, name, email, password } = userDetails;
        const saltRounds = parseInt(process.env.SALT, 10);
        console.log('Salt Rounds:', saltRounds);
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log('Password Hash:', passwordHash);

        const newUser = new User({
            username,
            name,
            email,
            password: passwordHash,
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            success: 201,
            message: 'User created successfully',
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({
            success: 500,
            message: 'Internal Server Error'
        });
    }
}


async function signin(req, res) {
    const userDetails = req.body;
    try {
        if (!userDetails) throw Error('User details not provided');
        const { email, password } = userDetails;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Wrong email or password', success: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Wrong email or password', success: 401 });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({
            success: 200,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
            success: 500
        });
    }
}


module.exports = {
    signup,
    signin
};