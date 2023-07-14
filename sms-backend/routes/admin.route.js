const express = require("express");
const { AdminModel } = require("../models/admin.model")
const { NoticeModel } = require("../models/notice.model");
const { Myclass } = require("../models/class.model");
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { StudentModel } = require("../models/student.model");
const { TeacherModel } = require("../models/teacher.model");
const { uploads } = require("../middlewares/multer");
const { SubjectModel } = require("../models/subjects.model");


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).send(admins);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      return res.send({
        message: "Admin already exists",
      });
    }
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    let value = new AdminModel({ email, password: hashedPassword });
    await value.save();
    const data = await AdminModel.findOne({ email });
    return res.send({ data, message: "Registered" });
  } catch (error) {
    res.send({ message: "Error" });
  }
});


router.post("/login", async (req, res) => {
  const { adminID, password } = req.body;
  try {
    const admin = await AdminModel.findOne({ adminID });

    if (admin) {
      // Compare the entered password with the hashed password
      const match = await bcrypt.compare(password, admin.password);

      if (match) {
        const token = jwt.sign({ foo: "bar" }, process.env.key, {
          expiresIn: "24h",
        });
        return res.send({ message: "Successful", user: admin, token: token });
      }
    }

    res.send({ message: "Wrong credentials" });
  } catch (error) {
    console.log({ message: "Error" });
    console.log(error);
  }
});

//edit admin
router.patch("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  const payload = req.body;
  try {
    await AdminModel.findByIdAndUpdate({ _id: id }, payload);
    const admin = await AdminModel.findById(id);
    if (!admin) {
      return res
        .status(404)
        .send({ message: `admin with id ${id} not found` });
    }
    res.status(200).send({ message: `Admin Updated`, user: admin });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

//get all teachers  
router.get("/teachers/all", async (req, res) => {
  try {
    const teachers = await TeacherModel.find();
    res.status(200).send(teachers);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

//create notices
router.post("/createnotice", async (req, res) => {
  const { title, details, date } = req.body;
  try {
    const notice = new NoticeModel({ title, details, date });
    await notice.save();
    res.status(200).send(notice);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

//get all notices
router.get("/getnotices", async (req, res) => {
  try {
    const notices = await NoticeModel.find();
    res.status(200).send(notices);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

//create class

router.post("/createclass", async (req, res) => {

  const { name } = req.body;
  console.log(req.body)
  try {
    const cls = new Myclass({
      name
    });
    await cls.save();
    res.status(200).send("Class created successfully");
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: "Something went wrong" });
  }
});

//show all classes
router.get("/getclasses", async (req, res) => {
  try {
    const classes = await Myclass.find();
    res.status(200).send(classes);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

//register student

router.post("/studentregister", uploads.single('image'), async (req, res) => {
  console.log(req.file.filename)
  const { classname, email } = req.body;
  console.log("name of class" + classname)
  try {
    const admin = await AdminModel.findOne({ email });
    const teacher = await TeacherModel.findOne({ email })
    const student = await StudentModel.findOne({ email });
    if (student || admin || teacher) {
      return res.send({
        message: "Student already exists",
      });
    }
    const classDivision = await Myclass.findOne({ _id: classname });
    console.log("full data" + classDivision)
    console.log(classDivision.division)
    const hashedPassword = bcrypt(req.body.password, 10)
    const studentData = { ...req.body, password: hashedPassword, division: classDivision.division, image: req.file.filename, studentID: Date.now() }
    let value = new StudentModel(studentData);
    await value.save();
    const data = await StudentModel.findOne({ email });
    const classdata = await Myclass.findOneAndUpdate(
      { _id: classname },
      { $inc: { strength: 1 }, $push: { student: data._id } },
      { new: true })
    classdata.inc()
    return res.send({ data, message: "Registered" });
  } catch (error) {
    res.send({ message: error });
  }
});

//get all students
router.get("/allstudents", async (req, res) => {
  try {
    const student = await StudentModel.find().populate('classname')
    res.status(200).send(student)
  } catch (error) {
    res.status(200).json({ message: "error occured !" })
  }
})
//create subjects
router.post('/createSubjects', async (req, res) => {
  console.log(req.body)
  try {
    const subject = new SubjectModel({
      class: req.body.class,
      subject: req.body.subject
    })
    await subject.save()
    if (subject) {
      res.status(200).json({ message: "succesfully added" })
    }
  } catch (error) {
    console.log(error)
    res.status(200).json({ message: "duplicate addition to classes" })
  }
})

//get subjects
router.get('/getsubjects', async (req, res) => {
  try {
    const subjects = await SubjectModel.find()
    if (subjects) {
      res.status(200).send(subjects)
    }
  } catch (error) {
    console.log(error)
  }
})

router.patch("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  const payload = req.body;
  try {
    const admin = await AdminModel.findByIdAndUpdate({ _id: id }, payload);
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  try {
    const admin = await AdminModel.findByIdAndDelete({ _id: id });
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

router.post("/password", (req, res) => {
  const { email, userId, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MID,
      pass: process.env.MPD,
    },
  });

  const mailOptions = {
    from: process.env.MID,
    to: email,
    subject: "Account ID and Password",
    text: `This is your User Id : ${userId} and  Password : ${password} .`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send(error);
    }
    return res.send("Password reset email sent");
  });
});

router.post("/forgot", async (req, res) => {
  const { email, type } = req.body;
  console.log(req.body)
  let user;
  let userId;
  let password;

  if (type == "student") {
    user = await StudentModel.find({ email });
    userId = user[0]?.studentID;
    password = user[0]?.password;
  }


  if (type == "admin") {
    user = await AdminModel.find({ email });
    console.log(user)
    userId = user[0]?.adminID;
    password = user[0]?.password;
  }

  if (type == "teacher") {
    user = await TeacherModel.find({ email });
    userId = user[0]?.teacherID;
    password = user[0]?.password;
  }

  if (!user) {
    return res.send({ message: "User not found" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MID,
      pass: process.env.MPD
    },
  });

  const mailOptions = {
    from: process.env.MID,
    to: email,
    subject: "Account ID and Password",
    text: `This is your User Id : ${userId} and  Password : ${password} .`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send(error);
    }
    return res.send("Password reset email sent");
  });
});

module.exports = router;


