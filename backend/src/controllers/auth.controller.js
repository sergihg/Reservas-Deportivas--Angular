const { request, response } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const login = async (req = request, res= response) => {

    const { email,  password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }

    try {
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(401).json({
                msg: "Datos inválidos"
            })
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                msg: "Datos inválidos"
            })
        }

        jwt.sign({
            email: user.email,
            role: user.role
        }, process.env.SECRET_KEY, {
            expiresIn: "1h"
        }, (error,token) => {
            if(error) {
                console.log(error);
                return res.status(500).json({
                    msg: "Error interno del servidor"
                })
            }

            return res.status(200).json({
                msg: "Login",
                token
            })
        })

    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}

const register = async (req = request, res= response) => {
    
    const { email,  password, name } = req.body;

    if(!email || !password || !name) {
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }

    try {
        const user = await User.findOne({email: email});
        if(user) {
            return res.status(400).json({
                msg: "El nombre de usuario ya existe"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        console.log('alksdf')

        const newUser = new User({
            email,
            password: hashedPassword,
            name: name,
            role: "entrenador"

        })

        await newUser.save();

        return res.status(200).json({
            msg: "Registro exitoso"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}

const check = async (req = request, res= response) => {
    const token = req.header("Authorization")

    if(!token) {
        return res.status(200).json({
            'logged': false
        })
    }
    try {

        const validate = jwt.verify(token,process.env.SECRET_KEY);
        return res.status(200).json({
            msg: 'Token válido',
            'logged': true
        })

    } catch (error) {
        return res.status(200).json({
            msg: "Token inválido",
            'logged': false
        })
    }
}
const getRole = async (req = request, res= response) => {
    const token = req.header("Authorization")

    if(!token) {
        return res.status(200).json({
            'role' : 'guest'
        })
    }
    try {

        const {role} = jwt.verify(token,process.env.SECRET_KEY);
        return res.status(200).json({
            role
        })

    } catch (error) {
        return res.status(200).json({
            'role': 'guest'
        })
    }
}

const getUser = async (req = request, res= response) => {
    const token = req.header("Authorization")
    try {
        const {email} = jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findOne({email: email},{email:1,name:1,role:1});
        if(!user) {
            return res.status(401).json({msg: 'no se encontró el usuario'})
        }
        return res.status(200).json(user);


    } catch (error) {
        const user = new User({

        })
        return res.status(200).json(user)
    }
}


module.exports = {
    login,
    register,
    check,
    getRole,
    getUser
}