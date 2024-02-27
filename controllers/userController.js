const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
        
        res.json({ message: "User created,", user: user });
    }   catch(err) {
        console.log('Something is wrong, ', err);
        res.status(400).json({ message: "Something is wrong...", error: err });
    }   finally {
        mongoose.disconnect();
    }
}

module.exports = { reg };
