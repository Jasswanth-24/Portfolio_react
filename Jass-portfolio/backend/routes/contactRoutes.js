const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getContactById,
  markAsRead,
  deleteContact,
} = require('../controllers/contactController');
const {
  contactValidationRules,
  validate,
} = require('../middleware/validateContact');

// Public route - Create contact message
router.post('/', contactValidationRules, validate, createContact);

// Protected routes (add authentication middleware in production)
// These routes are for admin/dashboard purposes
router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.patch('/:id/read', markAsRead);
router.delete('/:id', deleteContact);

module.exports = router;
