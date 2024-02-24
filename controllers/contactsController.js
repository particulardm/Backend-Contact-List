// getAll, get, post, delete, update

const getAllContacts = (req, res) => {
    console.log('get');
}

const postContact = (req, res) => {
    console.log('post');
}

const getContact = (req, res) => {
    console.log('getsingle');
}

const updateContact = (req, res) => {
    console.log('updatesingle');
}

const deleteContact = (req, res) => {
    console.log('delete');
}

module.exports = {
    getAllContacts, getContact, postContact, updateContact, deleteContact
};