'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const hospitalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cellphone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now()
    },
    password: {
        type: String,
        required: true
    },
    activateHospital: {
        type: Boolean,
        default: false
    },
    validateAccount: {
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        enum: ["admin","worker"],
        required: true
    }
});

hospitalSchema.methods.encryptPassword = async function(password){
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (e) {
      res.status(500).send({success: false, message: `Error al registrarte: ${err}`})
    }
  }

module.exports = mongoose.model('Hospital', hospitalSchema);