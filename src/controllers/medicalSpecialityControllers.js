'use strict';
const MedicalSpeciality = require('../models/medicalSpecialityModel');
const Verifications = require('../middlewares/verifications'); 

//Método para crear una Especialidad Médica
async function createMedicalSpeciality(req,res){
    const name = req.body.name;
    const description = req.body.description;
    try {
        const medicalSpeciality = new MedicalSpeciality({
            name: name,
            description: description
        })
        await medicalSpeciality.save((err)=>{
            if(err){
                res.status(500).json({
                    success: false,
                    message: `Error al registrar especialidad clinica: ${err}`
                })
            }
            res.status(200).json({
                success: true,
                message: 'Registro de especialidad con éxito' 
            })
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error al realizar alguna petición: ${error}`
        })
    }
}

async function getAllMedicalSpeciality(req,res){
    let desde = req.query.desde || 0;
    desde = Number(desde);
    try {
        const specialities = await MedicalSpeciality
        .find(
            {},
            {
                name: 1,
                description: 1,
                activateService: 1
            }
        )
        .skip(desde)
        .limit(10)
        .sort({ _id: -1 });
        const specialitiesTotal = await MedicalSpeciality.countDocuments();
        res.status(200).json({ 
            success: true, 
            specialities, 
            total: specialitiesTotal 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error al realizar alguna petición, por favor comunicarse con soporte`
        })
        console.log(error);
    }
}

module.exports= {
    createMedicalSpeciality,
    getAllMedicalSpeciality
}