const mongoose = require("mongoose");

const eventoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date:  {
        type: Date,
        required: true
    },
    horarioID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Evento',eventoSchema);