const { Router } = require("express");
const { login, register, check, getRole, getUser } = require("../controllers/auth.controller");

const router = Router();

router.post("/login",login);
router.post("/register",register);
router.get("/check",check);
router.get("/role",getRole)
router.get("/user",getUser)

module.exports = router;