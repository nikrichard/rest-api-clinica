'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clinicAppointmentSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    medicalSpecialityId: {
        type: Schema.Types.ObjectId,
        ref: 'MedicalSpeciality'
    },
    registrationDate: {
        type: Date,
        default: Date.now()
    },
    dateOfAttention: {
        type: Date,
        default: Date.now()
    },
    diagnosis: [{
        name:{
            type: String
        },
        observation: {
            type: String
        },
        statusSalud: {
            type: String
        }
    }]

})

module.exports = mongoose.model('ClinicAppointment', clinicAppointmentSchema);