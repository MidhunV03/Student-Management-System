const express = require('express');
const router = express.Router();
const functions = require('../controllers/studentController.js');

router.get('/',functions.getStudents);

router.post('/',functions.getNewStudent);

router.delete('/:id',functions.deleteStudent)

module.exports = router;