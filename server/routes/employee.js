const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// GET all employees
router.get('/', employeeController.getEmployees);

// POST new employee
router.post('/', employeeController.addEmployee);

// DELETE employee by ID
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
