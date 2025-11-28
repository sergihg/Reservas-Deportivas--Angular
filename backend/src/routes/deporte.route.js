const { Router } = require("express");
const { getAllDeportes, getMyDeportes, updateSport, createSport,deleteTrainer, deleteSport } = require("../controllers/deporte.controller");
const { verifyJWT } = require("../middlewares/verifyJWT");
const router = Router();

router.get("/",getAllDeportes);
router.get("/getMySports", [verifyJWT],getMyDeportes);
router.put("/:id", [verifyJWT],updateSport);
router.post("/", [verifyJWT],createSport);
router.delete("/entrenador/:id", [verifyJWT],deleteTrainer);
router.delete("/:id", [verifyJWT],deleteSport);

module.exports = router;
