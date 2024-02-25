const express = require('express');
const dotenv = require('dotenv').config();
const contactsRouter = require('./routers/contactsRouter');

const app = express();

const port = process.env.PORT || 3001;

// middlewares
app.use(express.json());

// routes:
app.use('/contacts', contactsRouter);

app.get('', (req,res) => {
    res.json({ message: "This is a response!"})
});

app.listen(port, () => {
    console.log('Listening on the following port:', port);
})

