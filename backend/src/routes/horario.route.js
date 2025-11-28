const { Router } = require("express");
const { getHorarios, getToday, getMyHorarios, getHorariosDeporte, updateHorario, updateDays, createHorario, enrolltoHorario, leaveHorario, deleteHorario, getCalendario } = require("../controllers/horario.controller");
const { verifyJWT } = require("../middlewares/verifyJWT");
const router = Router();

router.get("/", [verifyJWT],getHorarios);
router.get("/calendario", [verifyJWT],getCalendario);
router.get("/today", [verifyJWT],getToday);
router.get("/myHorarios/deporte/:id", [verifyJWT],getMyHorarios);
router.get("/deporte/:id", [verifyJWT],getHorariosDeporte);
router.put("/:id", [verifyJWT],updateHorario);
router.put("/days/:id", [verifyJWT],updateDays);
router.post("/", [verifyJWT],createHorario);
router.put("/enroll/:id", [verifyJWT],enrolltoHorario);
router.put("/leave/:id", [verifyJWT],leaveHorario);
router.delete('/:id',[verifyJWT],deleteHorario)

module.exports = router;
