const express = require('express');
const mongoose = require('mongoose');
const Org = require('../models/Org');
const router = express.Router();

// all organizations
router.get('/organizations', async (req, res) => {
  try {
    const organizations = await Org.find({});
    res.status(200).json({ success: true, data: organizations });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching organizations' });
  }
});

// specific organization by ID
router.get('/organizations/:orgId', async (req, res) => {
  const { orgId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    return res.status(404).json({ success: false, message: "Invalid Org ID" });
  }

  try {
    const organization = await Org.findById(orgId);
    if (!organization) {
        return res.status(404).json({ success: false, message: 'Organization not found' });
    }
    res.status(200).json({ success: true, data: organization });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching organization details' });
  }
});

//update organization details by ID
router.put('/organizations/:orgId', async (req, res) => {
  const { orgId } = req.params;
  const org = req.body;

  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    return res.status(404).json({ success: false, message: "Invalid Org ID" });
  }

  try {
    if (org.password) {
      org.password = await bcrypt.hash(org.password, 10);
    }

    const updatedOrg = await Org.findByIdAndUpdate(orgId, org, { new: true });

    if (!updatedOrg) {
      return res.status(404).json({ success: false, message: 'Organization not found' });
    }

    res.status(200).json({ success: true, data: updatedOrg });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating organization details' });
  }
});

router.delete('/organizations/:orgId', async (req, res) => {
  const { orgId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    return res.status(404).json({ success: false, message: "Invalid Org ID" });
  }

  try {
    const deletedOrg = await Org.findByIdAndDelete(orgId);
    if (!deletedOrg) {
      return res.status(404).json({ success: false, message: 'Organization not found' });
    }
    res.status(200).json({ success: true, data: deletedOrg });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting organization' });
  }
});

router.get('/organizations/:orgId/events', async (req, res) => {
  const { orgId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    return res.status(404).json({ success: false, message: "Invalid Org ID" });
  }

  try {
    const organization = await Org.findById(orgId).populate('events');

    if (!organization) {
      return res.status(404).json({ success: false, message: 'Organization not found' });
    }

    res.status(200).json({ success: true, data: organization.events });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching events for the organization' });
  }
});

module.exports = router;
