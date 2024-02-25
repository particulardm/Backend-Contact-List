const mongoose = require('mongoose');
const Contact = require('../models/contactModel');

const uri = process.env.URI;

// getAll, get, post, delete, update
// access is public, for now

const getAllContacts = async (req, res) => {
    try {
        await mongoose.connect(uri);
        console.log('database connected...');

        const contacts = await Contact.find({ });
        res.json(contacts);
    } catch(err) {
        console.log('Something is wrong, ', err);
    } finally {
        await mongoose.disconnect();
    }
}

const postContact = async (req, res) => {
    const { name, phone } = req.body;

    try {
        await mongoose.connect(uri);
        console.log('database connected...');

        const contact = await Contact.create({ name, phone });
        res.json(contact);
    } catch(err) {
        console.log('Something is wrong, ', err);
    } finally {
        await mongoose.disconnect();
    }
}

const getContact = async (req, res) => {
    const _id = req.params.id;

    try {
        await mongoose.connect(uri);
        console.log('database connected...');

        const contact = await Contact.findOne({ _id });
        res.json(contact);
    } catch(err) {
        console.log('Something is wrong, ', err);
    } finally {
        await mongoose.disconnect();
    }
}

const updateContact = async (req, res) => {
    const _id = req.params.id;
    const { name, phone } = req.body;

    try {
        await mongoose.connect(uri);
        console.log('database connected...');

        const contact = await Contact.updateOne({ _id }, { name, phone });
        res.json(contact);
    } catch(err) {
        console.log('Something is wrong, ', err);
    } finally {
        await mongoose.disconnect();
    }
}

const deleteContact = async (req, res) => {
    const _id = req.params.id;

    try {
        await mongoose.connect(uri);
        console.log('database connected...');

        const contact = await Contact.deleteOne({ _id });
        res.json(contact);
    } catch(err) {
        console.log('Something is wrong, ', err);
    } finally {
        await mongoose.disconnect();
    }
}

module.exports = {
    getAllContacts, getContact, postContact, updateContact, deleteContact
};