const express = require('express');
const Org = require('../models/Org');
const router = express.Router();

// all organizations
router.get('/organizations', async (req, res) => {
    try {
        const organizations = await Org.find();
        res.status(200).json(organizations);
      } catch (err) {
        res.status(500).send('Error fetching organizations');
      }
    
  });

// specific organization by ID
router.get('/organizations/:orgId', async (req, res) => {
    const { orgId } = req.params;
    try {
        const organization = await Org.findById(orgId);
        if (!organization) {
            return res.status(404).send('Organization not found');
        }
    res.status(200).json(organization);
  } catch (err) {
    res.status(500).send('Error fetching organization details');
  }
});

//update organization details by ID
router.put('/organizations/:orgId', async (req, res) => {
    const { orgId } = req.params;
    const {name, orgType, email} = req.body;
    try {
        const updatedOrg = await Org.findByIdAndUpdate(
          orgId,
          { name, orgType, email },
          { new: true } // Return the updated document
        );
    
        if (!updatedOrg) {
          return res.status(404).send('Organization not found');
        }
    
        res.status(200).json({
          message: 'Organization updated successfully',
          organization: updatedOrg,
        });
      } catch (err) {
        res.status(500).send('Error updating organization details');
      }
});

router.delete('/organizations/:orgId', async (req, res) => {
    const { orgId } = req.params;
    try {
        const deletedOrg = await Org.findByIdAndDelete(orgId);
        if (!deletedOrg) {
          return res.status(404).send('Organization not found');
        }
        res.status(200).json({
          message: 'Organization deleted successfully',
        });
      } catch (err) {
        res.status(500).send('Error deleting organization');
      }
});


module.exports = router;