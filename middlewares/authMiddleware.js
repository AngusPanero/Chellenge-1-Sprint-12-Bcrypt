const jwt = require("jsonwebtoken");
const hashedSecret = require('../crypto/config');
const {secret}  = require("../crypto/config");

function verificacion (req, res, next){
    const token = req.session.token;

    if(!token){
        return res.status(401).json({ mensaje: `No Hay Token` })
    }

    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            return res.status(401).json({ mensaje: `Token inválido o expirado` });
        }
        req.user = decoded.user;
        next(); 
    });
};

module.exports = verificacion