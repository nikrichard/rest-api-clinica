'use strict'
const express = require('express');
const router = express.Router();
const cors = require('cors');

//Import Controllers
const hospitalCtrl = require('../controllers/hospitalControllers');

//routes
router.post('/hospitalSignup', cors(), hospitalCtrl.hospitalSignup); //ruta para el registro de hospital
router.post('/hospitalSignin', cors(), hospitalCtrl.hospitalSignin); //ruta inicio de sesión de hospital

//router.delete('/deleteCategory/:id', cors(), hospitalCtrl.deleteCategory); //ruta para actualizar sucursal
//router.get('/getCategory/:categoryId', cors(), hospitalCtrl.getCategory); //ruta para mostrar sucursal
//router.put('/updateCategory/:id', cors(), hospitalCtrl.updateCategory); //ruta para actualizar sucursal
/*router.get('/getCategory/:categoryId', cors(), hospitalCtrl.getCategory); //ruta para mostrar sucursal
router.put('/updateCategory/:id', cors(), hospitalCtrl.updateCategory); //ruta para actualizar sucursal
router.delete('/deleteCategory/:id', cors(), hospitalCtrl.deleteCategory); //ruta para actualizar sucursal*/

module.exports = router
