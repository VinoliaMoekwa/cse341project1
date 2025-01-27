const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

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
    if (result) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: 'Contact not found' });
    }
};

const createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('contacts').insertOne(contact);

        if (response.insertedCount > 0) {
            res.status(201).json(response.ops[0]);
        } else {
            res.status(500).json({ message: "Some error occurred while creating the contact." });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};

const updateContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const updatedContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    console.log('Request body:', req.body); // Log the request body

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('contacts').updateOne({ _id: contactId }, { $set: updatedContact });

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Contact not updated" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};

const deleteContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('contacts').deleteOne({ _id: contactId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Contact not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};