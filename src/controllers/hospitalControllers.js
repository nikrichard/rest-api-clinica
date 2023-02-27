'use strict'
//Import Models
const Hospital = require('../models/hospitalModel');
const bcrypt = require("bcryptjs");
const service = require("../services/JWTService");

//Método para registro de hospital
async function hospitalSignup(req,res){
    const name = req.body.name;
    const cellphone = req.body.cellphone;
    const email = req.body.email;
    const address = req.body.address;
    const city = req.body.city;
    const country = req.body.country;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    const role = req.body.role;

    if(password !== passwordConfirm) {
        res.status(400).json({ 
            success: false, 
            messge: 'Las contraseñas no coinciden.' 
        });
        return;
    }

    try {
        const emailSearch = await Hospital.findOne({email: email});
        if(!emailSearch){
            const hospital = new Hospital({
                name: name,
                cellphone: cellphone,
                email: email,
                address: address,
                city: city,
                country: country,
                password: password,
                role: role
            })
            hospital.password = await hospital.encryptPassword(password)
            await hospital.save((err)=>{
                if(err){
                    res.status(500).json({
                        success: false,
                        message: `Error al registrarte; comunicate con el área de soporte`
                    })
                }
                res.status(200).json({
                    success: true,
                    message: 'Te registraste con éxito' 
                })
            })
        }else{
            res.status(401).json({ emailexist: true, message: "El email ya está en uso" });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error al realizar alguna petición, por favor comunicarse con soporte`
        })
        console.log(error);
    }
}

//Método para inicio de sesión de hospital
async function hospitalSignin(req,res){
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await Hospital.findOne({email: email});
        if(!user){
            res.status(401).json({ success: false, message: "Email o contraseña incorrecta" });
        }else{
            bcrypt.compare(password, user.password, (err,isMatch)=>{
                if(err){
                    res.status(500).json({ 
                        success: false,
                        message: `Error al realizar alguna petición, por favor comunicarse con soporte` 
                    });
                }if(!isMatch){
                    res.status(400).json({ 
                        success: false,
                        message: `Contraseña incorrecta`
                    });
                }else{
                    const token = service.createToken(user);
                    res.status(200).json({
                        success: true,
                        user:{
                            id: user._id,
                            token: "bearer " + token,
                            message: "Te has logueado correctamente"
                        }
                    })
                }
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

//Método para confirmar registro de hospital
function accountConfirmation(){

}

module.exports = {
    hospitalSignup,
    hospitalSignin,
    accountConfirmation
}





















//Import Models
//const BranchOffices = require('../models/branchOfficesModel');

/** Métodos CRUD para el módulo de Sucursales */

//Función para verificar la cantidad de caracteres que admite MONGODB en ObjectID
/*function verifyIdLength(id){
    const largeId = id.length
    if(largeId !== 24){
        return false
    }else{
        return true
    }
}*/

//Método para crear una sucursal
/*async function createBranch(req,res){
    const name = req.body.name
    const description = req.body.description
    const department = req.body.department
    const province = req.body.province
    const district = req.body.district
    const address = req.body.address
    const latitude = req.body.latitude
    const longitude = req.body.longitude

    const branchOffices = new BranchOffices({
        name: name,
        description: description,
        department: department,
        province: province,
        district: district,
        address: address,
        location : {
            latitude: latitude,
            longitude: longitude
        }
    })

    await branchOffices.save((err)=>{
        if(err){
            res.status(500).send({success: false, message: `Error al registrar sucursal: ${err}`})
        }else{
            res.status(200).json({success: true, message: 'Sucursal registrada con éxito'})
        }
    })

}

//Método para leer todas las sucursales
async function getBranchesOffices(req,res){
    let expectedQuery = req.query
    let numberNameFrom = "from" //nombre de la query que debemos de recibir
    let from = Number(expectedQuery.from); //variable para responder la busqueda desde un número determinado

    if(Object.entries(expectedQuery).length === 0){ //Verificamos si se envía o no una query
        res.status(409).json({success: false, message: "Error al realizar la petición"});
    }else{
        if(!expectedQuery.hasOwnProperty(numberNameFrom)){ //Verificamos si la query tiene la key esperada
            res.status(409).json({success: false, message: "Error al realizar la petició1"});
        }else{
            try {
                const branchs = await BranchOffices.find(
                    {},
                    {
                        name: 1,
                        description: 1,
                        department: 1,
                        province: 1,
                        district: 1,
                        address: 1,
                        location : 1
                    }
                )
                .skip(from)
                .limit(10)
                .sort({id: -1}); //-1 para descendente y 1 para ascendente
                const countBranchs = await BranchOffices.countDocuments() //Devolvemos la cantidad de documentos en la colección
                return res.status(200).json({success: true, branchs: branchs, total: countBranchs})//, total: countBranchs});
            
            } catch (error) {
                console.log(error)
                res.status(500).json({success: false, message: "Error al realizar alguna petición"})
            }      

        }
    }

}


//Método para leer una sucursal
async function getBranch(req,res){
    const branchId = req.params.branchId;
    
    try {
        const branchLength = verifyIdLength(branchId);
        if(!branchLength){
            res.status(409).json({success: false, message: "Error al realizar la petición"});
        }else{
            console.log(branchLength)
            const branch = await BranchOffices.findOne({_id: branchId}).exec();
            if(!branch){
                res.status(404).json({success: false, message: "Sucursal no encontrada"})
            }else{
                res.status(200).json({success: true, branch})
            }
        }
    } catch (errors) {
        res.status(500).json({success: false, message: "Error al realizar alguna petición"})
    }
}

//Método para actualizar una sucursal
async function updateBranch(req,res){
    const branchId = req.params.id
    const body = req.body;
    const update = {
        name : body.name,
        description : body.description,
        department : body.department,
        province : body.province,
        district : body.district,
        address : body.address,
        location: {
            latitude : body.latitude,
            longitude : body.longitude
        }
    }

    try{
        const verify = verifyIdLength(branchId);
        if(!verify){
            res.status(409).json({success: false, message: "Error al realizar la petición"});
        }else{
            const branchSearch = await BranchOffices.findOne({_id: branchId});
            if(!branchSearch){
                res.status(404).json({success: false, message: "Sucursal no encontrada"})
            }else{
                await BranchOffices.findByIdAndUpdate({_id: branchId}, update, {new: true});
                return res.status(200).json({success: true, message: "Actualización de sucursal con éxito"})
            }
        }
    }catch(errors){
        res.status(500).json({success: false, message: "Error al realizar alguna petición"})
    }
}

//Método para eliminar una sucursal
async function deleteBranch(req,res){
    const branchId = req.params.id
    try{
        const verify = verifyIdLength(branchId);
        if(!verify){
            res.status(409).json({success: false, message: "Error al realizar la petición"});
        }else{
            const branchSearch = await BranchOffices.findOne({_id: branchId});
            if(!branchSearch){
                res.status(404).json({success: false, message: "Sucursal no encontrada"})
            }else{
                await BranchOffices.findOneAndDelete({_id: branchId});
                return res.status(200).json({success: true, message: "Se eliminó correctamente la sucursal"})
            }
        }
    }catch(errors){
        res.status(500).json({success: false, message: "Error al realizar alguna petición"})
    }
}*/