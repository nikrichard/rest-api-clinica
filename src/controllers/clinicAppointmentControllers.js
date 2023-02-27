'use strict'
const Customer = require('../models/customerModel')

//Método para verificarla existencia del Email para Registro
async function checkIfEmailExists(req,res){
    const email = req.body.email
    try {
        const emailSearch = Customer.findOne({email: email});
        if(!emailSearch){
            res.status(200).json({
                emailExist: false,
                message: "El email no existe"
            })
        }else{
            res.status(200).json({
                emailExist: true,
                message: "El email ya stá en uso"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false, 
            message: "Error al realizar alguna petición"
        })
    }
}


function signUp(req,res){

}

module.exports = {
    checkIfEmailExists,
    signUp
}