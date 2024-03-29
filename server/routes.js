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

router.get('/booth', (req, res) => {
  res.render('booth.hbs', {});
});

router.get('/contact', (req, res) => {
  res.render('contact.hbs', {});
});
router.post('/contact', mailController.sendMail);

module.exports = router;
