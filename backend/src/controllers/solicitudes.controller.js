const { request, response } = require("express");
const User = require("../models/user.model");
const Solicitud = require("../models/solicitud.model");
const Deporte = require("../models/deporte.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");


const getAll = async (req = request, res= response) => {

    try {
        const result = await Solicitud.find().populate('sport','name');
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}
const acceptSolicitud = async (req = request, res= response) => {

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
        const solicitud = await Solicitud.findOne({_id: id});
        if(!solicitud) {
            return res.status(401).json({
                msg: 'No existe la solicitud'
            });
        }
        if(solicitud.role === 'socio') {
            const newUser = new User({
                name: solicitud.name,
                email: solicitud.email,
                password: solicitud.password,
                role: solicitud.role,
                code: solicitud.code
            })

            await Solicitud.deleteOne({_id:id})
            newUser.save()
            return res.status(200).json({
                msg: "Socio aceptado"
            })
        } else if(solicitud.role === 'entrenador') {
            const newUser = new User({
                name: solicitud.name,
                email: solicitud.email,
                password: solicitud.password,
                role: solicitud.role
            })

            const sport = await Deporte.findOne({_id: solicitud.sport})
            console.log('newUserID: ',newUser._id)
            if(!sport) {
                return res.status(400).json({
                    msg: 'Deporte no existe o fue borrado'
                })
            }
            await Solicitud.deleteOne({_id:id})
            newUser.save()
            sport.entrenadores.push(newUser);
            sport.save();

            return res.status(200).json({
                msg: "Entrenador aceptado"
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}
const rejectSolicitud = async (req = request, res= response) => {

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
        const solicitud = await Solicitud.findOne({_id: id});
        if(!solicitud) {
            return res.status(401).json({
                msg: 'No existe la solicitud'
            });
        }
        console.log(solicitud)

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}
const createSolicitud = async (req = request, res= response) => {
    const { name, email, password, role, sport, code } = req.body;
    
    if(!email || !password || !name || !role) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }
    if ((role === 'entrenador' && !sport) || (role === 'socio' && !code)){
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }
    try {
        const user = await User.findOne({email: email});
        let emailSolicitudes = await Solicitud.findOne({email: email})
        if(user || emailSolicitudes) {
            return res.status(400).json({
                msg: "El correo ya está en uso"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);

        if(role === 'entrenador') {
            if(!mongoose.isValidObjectId(sport)) {
                return res.status(400).json({
                    msg: "ID invalido"
                })
            }
            const sportExists = await Deporte.findById(sport)

        
            if(sportExists) {
                const newSolicitud = await Solicitud.create({
                    email,
                    password: hashedPassword,
                    name,
                    role,
                    sport
                })
                return res.status(200).json({
                    msg: "Solicitud creada"
                })
            } else {

                res.status(400).json({
                    msg: "No existe el deporte"
                })
            }
        } else if (role==='socio') {
            const userCode = await User.findOne({code:code})
            const solicitudCode = await Solicitud.findOne({code:code})
            if(userCode || solicitudCode) {
                return res.status(400).json({
                    msg: "El socio o la solicitud del socio ya existe"
                })
            }else {
                await Solicitud.create({
                    email,
                    password: hashedPassword,
                    name,
                    role,
                    code
                })
                return res.status(200).json({
                    msg: "Solicitud creada"
                })
            }
        }
        


    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }

}


module.exports = {
    getAll,
    createSolicitud,
    acceptSolicitud,
    rejectSolicitud
}