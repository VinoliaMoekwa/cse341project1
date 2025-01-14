const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', (req, res, next) => {
  console.log('GET /contacts');
  contactsController.getAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  console.log(`GET /contacts/${req.params.id}`);
  contactsController.getSingle(req, res, next);
});

module.exports = router;