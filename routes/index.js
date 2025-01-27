const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello world')});

router.use('/contacts',require('./contacts'));

module.exports = router;