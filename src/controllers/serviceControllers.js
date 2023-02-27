'use strict';
const Hospital = require('../models/hospitalModel');
const Service = require('../models/serviceModel');

//Método para registrar nuevo servicio
async function createService(req,res){
    const hospitalId = req.body.hospitalId;
    const name = req.body.name;
    const description = req.body.description;
    try {
        const hospital = await Hospital.find({_id: hospitalId});
        if(!hospital){
            res.status(401).json({ 
                success: false, 
                message: "Error al realizar petición, comunicate con soporte" 
            });
        }else{
            const service = new Service({
                hospitalId: hospitalId,
                name: name,
                description: description
            })
            await service.save((err)=>{
                if(err){
                    res.status(500).json({
                        success: false,
                        message: `Error al registrar servicio; comunicate con el área de soporte`
                    })
                }
                res.status(200).json({
                    success: true,
                    message: 'Registro realizado con éxito' 
                })
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error al realizar alguna petición, por favor comunicarse con soporte`
        })
        console.log(error);
    }
}

async function getAllServices(req,res){
    let desde = req.query.desde || 0;
    desde = Number(desde);
    try {
        const services = await Service
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
        const servicesTotal = await Service.countDocuments();
        res.status(200).json({ 
            success: true, 
            services, 
            total: servicesTotal 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error al realizar alguna petición, por favor comunicarse con soporte`
        })
        console.log(error);
    }
}

module.exports = {
    createService,
    getAllServices
}