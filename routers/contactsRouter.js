const express = require('express');
const router = express.Router();
const verify = require('../middlewares/verify');

const {
    getAllContacts, getContact, postContact, updateContact, deleteContact
} = require('../controllers/contactsController');

router.route('/')
    .get(getAllContacts)
    .post(postContact);

router.route('/:id')
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact);
    
module.exports = router;