const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusAppointmentSchema = new Schema({
    clinicAppointmentId:{
        type: Schema.Types.ObjectId,
        ref: 'ClinicAppointment'
    },
    created: {
        type: Boolean,
        default: true
    },
    attended: {
        type: Boolean,
        default: false
    },
    cancelled: {
        type: Boolean,
        default: false
    },
    postponed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('StatusAppointment', statusAppointmentSchema)