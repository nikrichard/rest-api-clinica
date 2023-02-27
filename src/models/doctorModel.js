'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    hospitalId: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    medicalSpecialityId: {
        type: Schema.Types.ObjectId,
        ref: 'MedicalSpeciality'
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
    activateDoctor: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ["doctor"],
        required: true
    },
    updatedPassword: {
        type: Boolean,
        default: false
    }
})

module.export = mongoose.model('Doctor', doctorSchema);
