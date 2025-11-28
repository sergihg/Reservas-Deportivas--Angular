const { Router } = require("express");
const router = Router();
const { getAll, createSolicitud, acceptSolicitud, rejectSolicitud } = require("../controllers/solicitudes.controller");
const { verifyJWT } = require("../middlewares/verifyJWT");


router.get("/",[verifyJWT],getAll)

router.post("/", createSolicitud)

router.put("/accept/:id",[verifyJWT], acceptSolicitud)
router.put("/reject/:id",[verifyJWT], rejectSolicitud)

module.exports = router;
