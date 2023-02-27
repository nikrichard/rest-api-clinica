'use strict'
const express = require('express');
const router = express.Router();
const cors = require('cors');

//Import Controllers
const indexCtrl = require('../controllers/indexControllers');

//indexRoutes
router.get('/', cors(), indexCtrl.welcome);

module.exports = router