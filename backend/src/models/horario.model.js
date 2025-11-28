const mongoose = require("mongoose");

const horarioSchema = mongoose.Schema({
    time: String,
    spots: Number,
    days: {
        type: Array,
        default: []
    },
    sport:  {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Deporte'
    },
    trainer: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    enrolled: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'User'
    }
})

module.exports = mongoose.model("Horario", horarioSchema)