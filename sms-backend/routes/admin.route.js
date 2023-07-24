const express = require("express");
require("dotenv").config();
const { uploads } = require("../middlewares/multer");
const { adminRegister, adminLogin, editAdmin, getAllTeachers, createNotice, createClass, getClasses, registerStudent, allstudents, createSubjects, getSubjects, deleteAdmin, sendDetails, getNotices, LeaveList, LeaveStatus } = require("../controllers/adminController");
const { authenticate } = require("../middlewares/admin.middleware");


const router = express.Router();

//register admin
router.post("/register", adminRegister)


router.post("/login", adminLogin)


//edit admin
router.patch("/:adminId", editAdmin)

//get all teachers  
router.get("/teachers/all", getAllTeachers)

//create notices
router.post("/createnotice", createNotice)

//get all notices
router.get("/getnotices", getNotices)

//create class

router.post("/createclass", createClass)

//show all classes
router.get("/getclasses", getClasses)

//register student

router.post("/studentregister", uploads.single('image'), registerStudent)

//get all students
router.get("/allstudents", allstudents)
//create subjects
router.post('/createSubjects', createSubjects)

//get subjects
router.get('/getsubjects', getSubjects)

router.patch("/:adminId", editAdmin)

router.delete("/:adminId", deleteAdmin)

router.post("/password", sendDetails)

router.get("/getleaves", LeaveList)

router.post("/leaveapprovel",LeaveStatus)

module.exports = router;


