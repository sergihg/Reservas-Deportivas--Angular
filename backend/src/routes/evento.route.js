const { Router } = require("express");
const router = Router();
const { getEventosHorario, getTodayEventos, getAllMyEventos, createEvento, updateEvento, deleteEvento } = require("../controllers/evento.controller");
const { verifyJWT } = require("../middlewares/verifyJWT");


router.get("/today", [verifyJWT],getTodayEventos);
router.get("/", [verifyJWT],getAllMyEventos);
router.get("/:id", [verifyJWT], getEventosHorario);
router.post("/:id", [verifyJWT], createEvento);
router.put("/:id", [verifyJWT], updateEvento);
router.delete("/:id", [verifyJWT], deleteEvento);


module.exports = router;
