const express = require('express');
const router = express.Router();

const mailController = require('../controllers/mailController');

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

router.get('/contact', (req, res) => {
  res.render('contact.hbs', {});
});
router.post('/contact', mailController.sendMail);

router.get('/registration', (req, res) => {
  res.render('registration.hbs', {});
});

module.exports = router;
