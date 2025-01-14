const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    console.log('contactsController.getAll called');
    const db = mongodb.getDatabase(); 
    const result = await db.collection('contacts').find();
    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
};

const getSingle = async (req, res) => {
    console.log(`contactsController.getSingle called with id: ${req.params.id}`);
    const contactId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase(); 
    const result = await db.collection('contacts').findOne({ _id: contactId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

module.exports = {
    getAll,
    getSingle
};
