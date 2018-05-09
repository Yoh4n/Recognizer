const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Distributor Model
const Distributor = require('../../models/Distributor');

// Load Input Validation
const validateDistributorInput = require('../../validation/distributor');

// @route   GET api/distributors/all
// @desc    Get all distributors
// @access  Private
router.get('/all', 
passport.authenticate('jwt', { session: false }), 
(req, res) => {
  const errors = {}

  Distributor.find()
    .then(distributors => {
      if(!distributors) {
        errors.noDistributor = 'No distributors have been created'
        return res.status(404).json(errors);
      }
      else {
        res.json(distributors);
      }
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/distributors/mainpk/:mainpk
// @desc    Get distributor by mainpk
// @access  Private
router.get('/mainpk/:mainpk', 
passport.authenticate('jwt', { session: false }), 
(req, res) => {
  const errors = {}

  Distributor.findOne({ mainpk: req.params.mainpk })
    .then(distributors => {
      if(!distributors) {
        errors.noDistributor = 'Mainpk not found';
        res.status(404).json(errors);
      }

      res.json(distributors)
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/distributors/:distName
// @desc    Get distributor by distName
// @access  Private
router.get('/distName/:distName', 
passport.authenticate('jwt', { session: false }), 
(req, res) => {
  const errors = {}

  Distributor.findOne({ distName: req.params.distName })
    .then(distributors => {
      if(!distributors) {
        errors.noDistributor = 'Distributor not found';
        res.status(404).json(errors);
      }

      res.json(distributors)
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/distributors/:id
// @desc    Get distributor by user id
// @access  Private
router.get('/id/:id', 
passport.authenticate('jwt', { session: false }), 
(req, res) => {
  const errors = {}

  Distributor.findOne({ _id: req.params.id })
    .then(distributors => {
      if(!distributors) {
        errors.noDistributor = 'Distributor id not found';
        res.status(404).json(errors);
      }
      res.json(distributors)
    })
    .catch(err => res.status(404).json({ distributor: 'There is no distributor with that id' }));
});

// @route   POST api/distributor
// @desc    Create or Update distributor
// @access  Private
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateDistributorInput(req.body);

    //Check Validation
    if(!isValid){
      return res.status(400).json(errors);
    }
    
    // Get fields
    const distributorFields = {};
    if (req.body.distName) distributorFields.distName = req.body.distName;
    if (req.body.prefName) distributorFields.prefName = req.body.prefName;
    if (req.body.accountName)
      distributorFields.accountName = req.body.accountName;
    if (req.body.mainpk) distributorFields.mainpk = req.body.mainpk;
    if (req.body.siteUrl) distributorFields.siteUrl = req.body.siteUrl;
    if (req.body.rank) distributorFields.rank = req.body.rank;
    if (req.body.rankDate) distributorFields.rankDate = req.body.rankDate;
    if (req.body.city) distributorFields.city = req.body.city;
    if (req.body.state) distributorFields.state = req.body.state;
    if (req.body.country) distributorFields.country = req.body.country;
    if (req.body.status) distributorFields.status = req.body.status;
    if (req.body.phone) distributorFields.phone = req.body.phone;
    if (req.body.email) distributorFields.email = req.body.email;

    const newDistributor = new Distributor({
      distName: distributorFields.distName,
      prefName: distributorFields.prefName,
      accountName: distributorFields.accountName,
      mainpk: distributorFields.mainpk,
      siteUrl: distributorFields.siteUrl,
      rank: distributorFields.rank,
      rankDate: distributorFields.rankDate,
      city: distributorFields.city,
      state: distributorFields.state,
      country: distributorFields.country,
      status: distributorFields.status,
      phone: distributorFields.phone,
      email: distributorFields.email
    });

    Distributor.findOne({ mainpk: distributorFields.mainpk }).then(distributors => {
      if(distributors) {
        //Update Distributor
        Distributor.findOneAndUpdate(
          { mainpk: distributorFields.mainpk },
          { $set: distributorFields },
          { new: true }
        ).then(distributors => res.json(distributors));
      } else {
        // Create new Distributor
        newDistributor
          .save()
          .then(distributors => res.json(distributors))
          .catch(err => console.log(err));
      }
    });
  }
);

// @route   DELETE api/distributors/:id
// @desc    DELETE distributor by id
// @access  Private
router.delete('/id/:id', 
passport.authenticate('jwt', { session: false }), 
(req, res) => {
  Distributor.findByIdAndRemove({ _id: req.params.id })
    .then(distributors => res.json(distributors))
    .catch(err => console.log(err));
});



module.exports = router;
