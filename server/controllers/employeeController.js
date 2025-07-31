const Employee = require('../models/Employee');

// GET all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ employees });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

// POST add new employee
exports.addEmployee = async (req, res) => {
  const { name, email, department } = req.body;
  try {
    const newEmployee = new Employee({ name, email, department });
    await newEmployee.save();
    res.json({ success: true, employee: newEmployee });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add employee' });
  }
};

// DELETE employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};
