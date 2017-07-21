const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  res.render('index.hbs', {});
});

router.get('/intro', (req, res) => {
  res.render('intro.hbs', {});
});

router.get('/calendar', (req, res) => {
  res.render('calendar.hbs', {});
});

router.get('/rules', (req, res) => {
  res.render('rules.hbs', {});
});

router.get('/wod', (req, res) => {
  res.render('wod.hbs', {});
});

module.exports = router;
