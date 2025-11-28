
const { request, response } = require("express");
const Deporte = require("../models/deporte.model");
const User = require("../models/user.model");
const Horario = require("../models/horario.model");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");

const getHorarios = async (req = request, res = response) => {
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
        const horarios = await Horario.find({trainer: user._id}).populate('enrolled','name code');
        
        res.status(200).json(horarios);

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}
const getCalendario = async (req = request, res = response) => {
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
        let horarios;
        if(user.role==='socio') {
            horarios = await Horario.find({enrolled: user._id}).select('days sport').populate('sport','name');
        } else if(user.role === 'entrenador') {
            horarios = await Horario.find({trainer: user._id}).select('days sport').populate('sport','name');
        }
        res.status(200).json(horarios);

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}
const getMyHorarios = async (req = request, res = response) => {
    const token = req.header("Authorization")
    if(!token) {
        return res.status(403).json({
            msg: 'inicia sesión antes'
        });
    }
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
        const {email} = jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(401).json({
                msg: "No se encontró horarios"
            })
        }
        
        const horarios = await Horario.find({enrolled: user._id, sport: id}).populate('trainer','name');

        res.status(200).json(horarios);

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}
const getToday = async (req = request, res = response) => {
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
        let horarios;
        const today = (new Date()).getDay()
        if(user.role==='socio') {
            horarios = await Horario.find({enrolled: user._id, days: (today-1)},).populate('sport','name');
        } else if(user.role === 'entrenador') {
            horarios = await Horario.find({trainer: user._id, days: (today-1)}).populate('sport','name');
        }
        res.status(200).json(horarios);

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}
const getHorariosDeporte = async (req = request, res = response) => {
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
        const horarios = await Horario.find({sport: id}).populate('trainer','name').populate('enrolled','_id');
        
        res.status(200).json(horarios);

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}

const updateHorario = async (req = request, res= response) => {

    const id = req.params.id;
    const { time, spots } = req.body;

    if(!time || !spots || !id) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            msg: "ID invalido"
        })
    }
    
    if(!validateFields(spots,time)) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }

    const modifiedData = {
        time, spots
    };

    try {
        const result = await Horario.updateOne({_id: id},modifiedData);

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
const updateDays = async (req = request, res= response) => {

    const id = req.params.id;
    const { days } = req.body;

    if(!days || !id) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            msg: "ID invalido"
        })
    }
    
    if( days.length === 0) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }
    const daysValid = days.every(day => day >=1 && day<= 5)
    if( !daysValid) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }

    try {
        const result = await Horario.updateOne({_id: id},{days: days});

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
const createHorario = async (req = request, res= response) => {

    const { time, spots, days } = req.body;

    if(!time || !spots || !days) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }

    if(!validateFields(spots,time)) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }
    const daysValid = days.every(day => day >=1 && day<= 5)
    
    if( days.length === 0) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }
    if( !daysValid) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }

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
            return res.status(400).json({
                msg: "El usuario no existe"
            })
        }
        const sport = await Deporte.findOne({entrenadores: user._id})
        if(!sport) {
            return res.status(400).json({
                msg: "El deporte no existe"
            })
        }

        const newHorario = new Horario({
            time,
            spots,
            days,
            enrolled: [],
            trainer: user._id,
            sport: sport._id
        })
        
        await newHorario.save();
        
        return res.status(200).json({
            msg: "Registro exitoso"
        })

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }

}
const enrolltoHorario = async (req = request, res= response) => {

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
        if(!user) {
            return res.status(400).json({
                msg: "El usuario no existe"
            })
        }
        const horario = await Horario.findOne({_id: id});
        if(!horario) {
            return res.status(400).json({
                msg: "El horario no existe"
            })
        }

        const enrolled = horario.enrolled.includes(user._id);
        if(enrolled)
        {
            return res.status(400).json({
                msg: "Usuario ya inscrito"
            })
        }

        horario.enrolled.push(user);
        horario.save()
        
        return res.status(200).json({
            msg: "Se inscribió correctamente al horario"
        })
        

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}
const leaveHorario = async (req = request, res= response) => {

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
        if(!user) {
            return res.status(400).json({
                msg: "El usuario no existe"
            })
        }
        const horario = await Horario.updateOne({ _id: id},
            {$pull: {
                enrolled: user._id
            }}
        );
        
        if(horario.modifiedCount === 1) {
            res.status(200).json({
                msg: "Desinscrito"
            })
        } else {
            res.status(400).json({
                msg: "No se desinscribió"
            })
        }
        

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}

function compareTime(time1,time2) {
    let no1 = Number(time1.split(':')[0])
    let no2 = Number(time2.split(':')[0])
    return no1 > no2
}

function validateFields(spots,time) {
    if((spots<5 || spots > 30) || (compareTime('9:00',time) || compareTime(time,'21:00')))
        return false
    return true
}
const deleteHorario = async (req = request, res= response) => {
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
        if(!user || user.role !== 'entrenador') {
            return res.status(400).json({
                msg: "El usuario no es entrenador"
            })
        }
        //agregar cuando se haga lo de los eventos
        const horario = await Horario.deleteOne({ _id: id, trainer: user._id},);
        
        if(horario.deletedCount === 1) {
            res.status(200).json({
                msg: "Horario eliminado"
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
    getHorarios,
    getToday,
    getCalendario,
    getMyHorarios,
    getHorariosDeporte,
    updateHorario,
    updateDays,
    createHorario,
    enrolltoHorario,
    leaveHorario,
    deleteHorario

}