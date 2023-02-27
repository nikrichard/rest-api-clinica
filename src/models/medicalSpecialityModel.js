'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicalSpecialitySchema = new Schema({
    hospitalId: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now()
    },
    activateMedicalSpeciality: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('MedicalSpeciality', medicalSpecialitySchema);