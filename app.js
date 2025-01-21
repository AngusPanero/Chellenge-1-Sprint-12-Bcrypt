const express = require("express")
const session = require("express-session")
const rutas = require("./routes/users")
const {secret} = require('./crypto/config');
const verificacion = require("./middlewares/authMiddleware")

const app = express()
const PORT = 10000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use("/", rutas);

app.get("/", (req, res) => {
    const formularioIndex = `
    <form action="/login" method="post">
    <label for="username">Usuario</label>
    <input type="text" id="username" name="username" required><br>

    <label for="password">Contraseña</label>
    <input type="text" id="password" name="password" required><br>

    <button type="submit">Iniciar Sesión</button>
    </form>
    <a href="/dashboard">DashBoard</a>
    `

    res.send(formularioIndex)
})

app.use((req, res) => {
    res.send(`<h1> 404 - Página no Encontrada</h1>`)
})

app.listen(PORT, () => {
    console.log(`Server Listening on Port: http://localhost:${PORT}`)
})