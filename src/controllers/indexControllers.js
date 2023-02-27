'use strict'

function welcome(req,res){
    res.json({message: "Hola mundo"})
}

module.exports = {
    welcome
}