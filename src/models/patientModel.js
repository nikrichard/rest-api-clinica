'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const patientSchema = new Schema({
    hospitalId: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cellphone: {
        type: String,
        required: true
    },
    documentNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now()
    },
    activatePatient: {
        type: Boolean,
        default: false
    },
    validateAccount: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["patient"],
        required: true
    }
})

module.exports = mongoose.model('Patient', patientSchema);