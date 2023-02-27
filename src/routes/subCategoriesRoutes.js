'use strict'
const express = require('express');
const router = express.Router();
const cors = require('cors');

//Import Controllers
const subCategoriesCtrl = require('../controllers/subcategoryControllers');

//routes
router.post('/createSubCategory', cors(), subCategoriesCtrl.createSubCategory); //ruta para crear Sucursal
router.get('/getAllSubCategories', cors(), subCategoriesCtrl.getAllSubCategories); //ruta para mostrar sucursales
router.get('/getSubCategory/:subCategoryId', cors(), subCategoriesCtrl.getSubCategory); //ruta para mostrar sucursal
router.put('/updateSubCategory/:id', cors(), subCategoriesCtrl.updateSubCategory); //ruta para actualizar sucursal
router.delete('/deleteSubCategory/:id', cors(), subCategoriesCtrl.deleteSubCategory); //ruta para actualizar sucursal

module.exports = router