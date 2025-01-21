const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const {secret} = require('../crypto/config');
const verificacion = require('../middlewares/authMiddleware');
const users = require('../data/users');

const router = express.Router();

router.post("/login" ,(req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ user: user.id }, secret, { expiresIn: "1h" });
        req.session.token = token;
        res.redirect("/dashboard");
    } else {
        res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
});

router.get("/dashboard", verificacion, (req, res) => {
    const user = users.find((u) => u.id === req.user);

    if (user) {
        res.send(`
            <h1>Bienvenido, ${user.name}</h1>
            <p>ID: ${user.id}</p>
            </form> <a href="/">home</a>
        `);
    } else {
        res.status(401).json({ mensaje: `Usuario inexistente` });
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;