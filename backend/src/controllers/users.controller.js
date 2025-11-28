const { request, response } = require("express");
const User = require("../models/user.model");
const Deporte = require("../models/deporte.model")
const Horario = require("../models/horario.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const getSocios = async (req=request,res=response) => {
    try {
        const result = await User.find({role:'socio'});
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}

const updateUser = async (req = request, res= response) => {

    const id = req.params.id;
    const { name, email } = req.body;

    if(!name || !email || !id) {
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
        name, email
    };

    try {
        const result = await User.updateOne({_id: id},modifiedData);

        if(result.modifiedCount === 1) {
            res.status(200).json({
                msg: "Usuario actualizado"
            })
        } else {
            res.status(400).json({
                msg: "Usuario no modificado"
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}
const createUser = async (req = request, res= response) => {

    const { name, email, password, role, sport, code } = req.body;
    
    if(!email || !password || !name || !role || (!sport && !code)) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }
    if (!(role === 'entrenador'|| role === 'socio')){
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }

    try {
        const user = await User.findOne({email: email});
        if(user) {
            return res.status(400).json({
                msg: "El correo ya está en uso"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        if(role==='socio'){
            const newUser = new User({
                email,
                password: hashedPassword,
                name: name,
                role: role,
                code: code
            })
        await newUser.save();
        } else {
            const newUser = new User({
                email,
                password: hashedPassword,
                name: name,
                role: role
            })
        await newUser.save();
            const sportResult = await Deporte.updateOne({name:sport},{$push: {entrenadores: newUser._id}})
        
            if(sportResult.modifiedCount !== 1) {
                res.status(400).json({
                    msg: "Usuario no se pudo crear"
                })
            }
        }
        console.log('lñaskd')
        return res.status(200).json({
            msg: "Registro exitoso"
        })
        
        

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }

}
const deleteUser = async (req = request, res= response) => {

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
        const user = await User.deleteOne({_id: id});

        if(user.deletedCount === 1) {
            await Horario.updateMany({},
                {$pull: {
                    enrolled: id
                }}
            );
            res.status(200).json({
                msg: "Usuario eliminado"
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
    getSocios,
    updateUser,
    createUser,
    deleteUser
}