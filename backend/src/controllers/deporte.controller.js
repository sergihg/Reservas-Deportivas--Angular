
const { request, response } = require("express");
const Deporte = require("../models/deporte.model");
const User = require("../models/user.model");
const Horario = require("../models/horario.model");
const { default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken')

const getAllDeportes = async (req = request, res = response) => {

    // const { search } = req.query;

    try {
        const result = await Deporte.find().populate('entrenadores','name email id');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}
const getMyDeportes = async (req = request, res = response) => {
    const token = req.header("Authorization")
    if(!token) {
        return res.status(403).json({
            msg: 'inicia sesión antes'
        });
    }
    try {
        const {email} = jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(401).json({
                msg: "No se encontró horarios"
            })
        }
        const sportsIDS = await Horario.find({enrolled: user._id}).distinct('sport');
        const sports = await Deporte.find({_id: sportsIDS})

        res.status(200).json(sports);

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}

const updateSport = async (req = request, res= response) => {

    const id = req.params.id;
    const { name, description } = req.body;

    if(!name || !description || !id) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            msg: "ID invalido"
        })
    }

    const modifiedData = {
        name, description
    };

    try {
        const result = await Deporte.updateOne({_id: id},modifiedData);

        if(result.modifiedCount === 1) {
            res.status(200).json({
                msg: "Deporte actualizado"
            })
        } else {
            res.status(400).json({
                msg: "Deporte no modificado"
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}
const createSport = async (req = request, res= response) => {

    const { name, description } = req.body;
    
    if(!name || !description ) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }

    try {
        const sport = await Deporte.findOne({name: name});
        if(sport) {
            return res.status(400).json({
                msg: "El deporte ya existe"
            })
        }

        const newDeporte = new Deporte({
            name,
            description

        })
        
        const sportResult = await Deporte.updateOne({name:sport},{$push: {entrenadores: newDeporte._id}})

        
        await newDeporte.save();
        
        return res.status(200).json({
            msg: "Registro exitoso"
        })

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }

}
const deleteTrainer = async (req = request, res= response) => {

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

    const token = req.header('Authorization')
    if(!token) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }
    try {
        const {email} = jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findOne({email: email});
        if(!user || user.role !== 'gerencia') {
            return res.status(400).json({
                msg: "El usuario no es gerencia"
            })
        }
        const trainer = await User.deleteOne({_id: id});
        await Horario.deleteMany({trainer: id});
        
        if(trainer.deletedCount === 1) {
            res.status(200).json({
                msg: "Entrenador eliminado"
            })
        } else {
            res.status(400).json({
                msg: "No se eliminó"
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }

}
const deleteSport = async (req = request, res= response) => {

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

    const token = req.header('Authorization')
    if(!token) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }
    try {
        const {email} = jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findOne({email: email});
        if(!user || user.role !== 'gerencia') {
            return res.status(400).json({
                msg: "El usuario no es gerencia"
            })
        }
        const trainerIDS = await Horario.find({sport: id}).distinct('trainer');
        await User.deleteMany({_id: trainerIDS});
        await Horario.deleteMany({sport: id});

        const sport = await Deporte.deleteOne({_id: id});
        
        if(sport.deletedCount === 1) {
            res.status(200).json({
                msg: "Deporte eliminado"
            })
        } else {
            res.status(400).json({
                msg: "No se eliminó"
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }

}

module.exports = {
    getAllDeportes,
    getMyDeportes,
    updateSport,
    createSport,
    deleteTrainer,
    deleteSport

}