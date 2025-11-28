const mongoose = require("mongoose");

const solicitudSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name:  {
        type: String,
        required: true
    },
    password:  {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "socio"
    },
    code: {
        type: Number,
        required: false
    },
    sport: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Deporte',
        required: false
    },
})

module.exports = mongoose.model("Solicitud", solicitudSchema)