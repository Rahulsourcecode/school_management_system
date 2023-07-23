const express = require("express");
const { studentLogin, editStudent, fetchImage, deleteStudent } = require("../controllers/studentController");
const router = express.Router();


//students login
router.post("/login",studentLogin )

router.patch("/:studentId",editStudent)

router.delete("/:studentId",deleteStudent)
//fetch ProfileImage
router.post("/fetchimage",fetchImage)
module.exports = router;
