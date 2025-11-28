const express = require('express');
const cors = require('cors');
const connectDB = require('../config/database');


class Server {

    constructor() {
        this.port = process.env.PORT || 8080;
        this.app = express();


        // this.filmsPath = "/films";
        this.deportesPath = "/deportes";
        this.authPath = "/auth";
        this.usersPath = "/users";
        this.horariosPath = "/horarios";
        this.solicitudesPath = "/solicitudes";
        this.eventosPath = "/eventos";

        this.middlewares();
        this.routes();
        connectDB();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

    routes() {

        this.app.use(this.deportesPath, require("../routes/deporte.route"));
        this.app.use(this.authPath, require("../routes/auth.route"));
        this.app.use(this.usersPath, require("../routes/users.route"));
        this.app.use(this.horariosPath, require("../routes/horario.route"));
        this.app.use(this.solicitudesPath, require("../routes/solicitud.route"));
        this.app.use(this.eventosPath, require("../routes/evento.route"));



        this.app.get(/.*/, function (req, res) {
            res.status(404).json({
                msg: "Ruta no encontrada",
            });
        });
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }
}

module.exports = Server;