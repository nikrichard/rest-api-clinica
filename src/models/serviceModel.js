'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
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
    activateService: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Service', serviceSchema);