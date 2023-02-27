'use strict'
const express = require('express');
const router = express.Router();
const cors = require('cors');

//Import Controllers
const serviceCtrl = require('../controllers/serviceControllers');

//routes
router.post('/createService', cors(), serviceCtrl.createService); //ruta para el registro de hospital
router.get('/getAllServices', cors(), serviceCtrl.getAllServices); //ruta para mostrar servicios de 10 en 10

//router.delete('/deleteCategory/:id', cors(), serviceCtrl.deleteCategory); //ruta para actualizar sucursal
//router.get('/getCategory/:categoryId', cors(), serviceCtrl.getCategory); //ruta para mostrar sucursal
//router.put('/updateCategory/:id', cors(), serviceCtrl.updateCategory); //ruta para actualizar sucursal
/*router.get('/getCategory/:categoryId', cors(), serviceCtrl.getCategory); //ruta para mostrar sucursal
router.put('/updateCategory/:id', cors(), serviceCtrl.updateCategory); //ruta para actualizar sucursal
router.delete('/deleteCategory/:id', cors(), serviceCtrl.deleteCategory); //ruta para actualizar sucursal*/

module.exports = router
