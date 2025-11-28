const { Router } = require("express");
const router = Router();
const { getSocios, updateUser, createUser, deleteUser } = require("../controllers/users.controller");
const { verifyJWT } = require("../middlewares/verifyJWT");


router.get("/socios", [verifyJWT],getSocios)

// router.post("/", createUser)
    
router.delete("/:id",[verifyJWT],deleteUser)

router.put("/:id",[verifyJWT], updateUser)

module.exports = router;
