const Contact = require('../models/Contact');
const { sendAutoReply, sendNotification } = require('../utils/emailService');

/**
 * @desc    Create a new contact message
 * @route   POST /api/contact
 * @access  Public
 */
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create new contact entry
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
    });

    // Send emails in parallel (non-blocking — don't let email failure break the response)
    Promise.allSettled([
      sendAutoReply({ name, email, subject }),
      sendNotification({
        name,
        email,
        subject,
        message,
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        createdAt: contact.createdAt,
      }),
    ]).then((results) => {
      results.forEach((result, index) => {
        const label = index === 0 ? 'Auto-reply' : 'Notification';
        if (result.status === 'fulfilled') {
          console.log(`✅ ${label} email sent successfully`);
        } else {
          console.error(`❌ ${label} email failed:`, result.reason?.message);
        }
      });
    });

    // Send success response immediately (don't wait for emails)
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }

    // Handle duplicate key error (if any unique constraints)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate entry detected',
      });
    }

    // Generic server error
    console.error('Contact creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

/**
 * @desc    Get all contact messages (for admin purposes)
 * @route   GET /api/contact
 * @access  Private (add auth middleware in production)
 */
const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Contact.countDocuments();

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: contacts,
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

/**
 * @desc    Get single contact message
 * @route   GET /api/contact/:id
 * @access  Private (add auth middleware in production)
 */
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID',
      });
    }

    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

/**
 * @desc    Mark contact as read
 * @route   PATCH /api/contact/:id/read
 * @access  Private (add auth middleware in production)
 */
const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact marked as read',
      data: contact,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID',
      });
    }

    console.error('Mark as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

/**
 * @desc    Delete contact message
 * @route   DELETE /api/contact/:id
 * @access  Private (add auth middleware in production)
 */
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully',
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID',
      });
    }

    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  markAsRead,
  deleteContact,
};
