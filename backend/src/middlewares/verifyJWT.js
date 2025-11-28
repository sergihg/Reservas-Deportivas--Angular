const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyJWT = async (req = request, res = response, next) => {
    const token = req.header("Authorization")

    if (!token) {
        return res.status(401).json({
            msg: "Token inválido"
        })
    }

    try {

        const { email } = jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findOne({email: email});

        if(!user) {
            return res.status(401).json({
                msg: "Token inválido"
            })
        }

        next();

    } catch (error) {
        return res.status(401).json({
            msg: "Token inválido"
        })
    }
}

module.exports = {
    verifyJWT
}