'use strict'
const express = require('express');
const router = express.Router();
const cors = require('cors');

//Import Controllers
const medicalSpecialityCtrl = require('../controllers/medicalSpecialityControllers');

//routes
router.post('/createMedicalSpeciality', cors(), medicalSpecialityCtrl.createMedicalSpeciality); //ruta para crear especialidad médica
router.get('/getAllMedicalSpeciality', cors(), medicalSpecialityCtrl.getAllMedicalSpeciality); //ruta para mostrar especialidades médicas de 10 en 10
//router.get('/getBranch/:branchId', cors(), branchOfficesCtrl.getBranch); //ruta para mostrar sucursal
//router.put('/updateBranch/:id', cors(), branchOfficesCtrl.updateBranch); //ruta para actualizar sucursal
//router.delete('/deleteBranch/:id', cors(), branchOfficesCtrl.deleteBranch); //ruta para actualizar sucursal

module.exports = router