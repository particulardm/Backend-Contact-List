const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const uri = process.env.URI;

const reg = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await mongoose.connect(uri);
        console.log('connected for db and ready to create new user');

        const usernameExists = await User.exists({ username });
        const emailExists = await User.exists( { email });
    
        if (usernameExists || emailExists) {
          return res.status(400).send('Username or email already exists.');
        }

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hash});
        
        res.json({ message: "User created,", user });
    }   catch(err) {
        console.log('Something is wrong, ', err);
        res.status(400).json({ message: "Something is wrong...", error: err });
    }   finally {
        mongoose.disconnect();
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        await mongoose.connect(uri);
        console.log('connected for db and proceeding to login');

        const emailExists = await User.exists( { email });
    
        if (!emailExists) {
          return res.status(400).send('No user with this email.');
        }

        const user = await User.findOne( {email} );
        console.log(user);
        const hash = user.password;
        const passwordMatch = await bcrypt.compare(password, hash);

        if (!passwordMatch) {
            return res.status(400).send('Please enter a valid password.');
        }

        const secret = process.env.SECRET;
        const token = jwt.sign({username: user.username, email}, secret, {expiresIn: '24h'});
        
        res.json({ message: "Please don't show it to anyone", token });
    }   catch(err) {
        console.log('Something is wrong, ', err);
        res.status(400).json({ message: "Something is wrong...", error: err });
    }   finally {
        mongoose.disconnect();
    }
}

module.exports = { reg, login };
