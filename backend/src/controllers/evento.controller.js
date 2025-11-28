const { request, response } = require("express");
const User = require("../models/user.model");
const Horario = require("../models/horario.model")
const Evento = require("../models/evento.model")
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");

const getEventosHorario = async (req=request,res=response) => {
    const id = req.params.id;
    if(!id) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            msg: "ID invalido"
        })
    }
    try {
        const result = await Evento.find({horarioID:id, date: {$gte: new Date()}});
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}
const getAllMyEventos = async (req=request,res=response) => {

    const token = req.header('Authorization');

    if(!token) {
        return res.status(403).json({
            msg: 'inicia sesión antes'
        });
    }
    try {
        const {email} = jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({
                msg: "No existe el horario"
            })
        }

        if(!user) {
            return res.status(401).json({
                msg: "No se encontró eventos"
            })
        }
        let eventos;
        let horarios;
        if(user.role==='socio') {
            horarios = await Horario.find({enrolled: user._id});
        } else if(user.role === 'entrenador') {
            horarios = await Horario.find({trainer: user._id});
        }

        eventos = await Evento.find({horarioID: horarios})

        res.status(200).json(eventos);

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}
const getTodayEventos = async (req=request,res=response) => {

    const token = req.header('Authorization');

    if(!token) {
        return res.status(403).json({
            msg: 'inicia sesión antes'
        });
    }
    try {
        const {email} = jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({
                msg: "No existe el horario"
            })
        }

        if(!user) {
            return res.status(401).json({
                msg: "No se encontró eventos"
            })
        }
        let eventos;
        let horarios;
        const today = new Date()
        if(user.role==='socio') {
            horarios = await Horario.find({enrolled: user._id});
        } else if(user.role === 'entrenador') {
            horarios = await Horario.find({trainer: user._id});
        }

        eventos = await Evento.find({horarioID: horarios, date: {$gte: today}})

        res.status(200).json(eventos);

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}

const updateEvento = async (req = request, res= response) => {
    return res.status(400).json({
        msg: 'Elimina el evento o crea otro para modificar los datos'
    });
}

const createEvento = async (req = request, res= response) => {
    const id = req.params.id;

    if(!id) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            msg: "ID invalido"
        })
    }
    
    const {title,date} = req.body;
    
    console.log(req.body)
    if(!title || !date) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }

    const token = req.header('Authorization');
    if(!token) {
        return res.status(403).json({
            msg: 'inicia sesión antes'
        });
    }
    try {
        const {email} = jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({
                msg: "No existe el horario"
            })
        }

        const horario = await Horario.findOne({_id: id, trainer:user._id});

        if(!horario) {
            return res.status(400).json({
                msg: "No existe el horario"
            })
        }
        
        const newEvento = new Evento({
            title,
            date,
            'horarioID':id
        })

        await newEvento.save();
    
        return res.status(200).json({
            msg: "Registro exitoso"
        })
        
        

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }

}
const deleteEvento = async (req = request, res= response) => {
    const id = req.params.id;

    if(!id) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            msg: "ID invalido"
        })
    }
    
    const token = req.header('Authorization');
    if(!token) {
        return res.status(403).json({
            msg: 'inicia sesión antes'
        });
    }
    try {
        const {email} = jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({
                msg: "No existe el evento"
            })
        }

        const evento = await Evento.findOne({_id: id});

        if(!evento) {
            return res.status(400).json({
                msg: "No existe el evento"
            })
        }

        const horario = await Horario.findOne({_id: evento.horarioID, trainer:user._id});

        if(!horario) {
            return res.status(400).json({
                msg: "No existe el evento"
            })
        }
    
        const deleted = await Evento.deleteOne({_id: id})
        if(deleted.deletedCount === 1) {
            res.status(200).json({
                msg: "Evento eliminado"
            })
        } else {
            res.status(400).json({
                msg: "No se eliminó"
            })
        }
        return res.status(200).json({
            msg: "Registro exitoso"
        })
        
        

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }

}


module.exports = {
    getEventosHorario, 
    getTodayEventos,
    getAllMyEventos,
    createEvento, 
    updateEvento, 
    deleteEvento
}