const mongoose = require("mongoose");

const deporteSchema = mongoose.Schema({
    name: String,
    description: {
        type: String,
        default: ''
    },
    entrenadores: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'User'
    }
})

module.exports = mongoose.model("Deporte", deporteSchema);