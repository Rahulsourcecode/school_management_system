const express = require("express");
const { TeacherModel } = require("../models/teacher.model");
const { AdminModel } = require("../models/admin.model");
const { StudentModel } = require("../models/student.model")
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { uploads } = require("../middlewares/multer");
const { studentAttendance } = require("../models/Student.attendance.model");
const { Myclass } = require('../models/class.model')
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const teachers = await TeacherModel.find();
    res.status(200).send(teachers);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});


router.post("/register", uploads.single('image'), async (req, res) => {
  try {
    console.log(req.body)
    const { email, password, ...otherFields } = req.body;
    console.log(email)
    // Check if the teacher or admin with the given email already exists
    const admin = await AdminModel.findOne({ email });
    const teacherd = await TeacherModel.findOne({ email });

    if (teacherd || admin) {
      return res.send({
        message: "Teacher already exists",
      });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Teacher object
    const teacher = new TeacherModel({
      email,
      password: hashedPassword,
      teacherID: Date.now(),
      image: req.file.filename,
      ...otherFields,
    });
    // Save the teacher to the database
    await teacher.save();

    // Retrieve the saved teacher data
    const user = await TeacherModel.findOne({ email });
    if (user) {
      // Return a success response
      const data = {
        email: req.body.email,
        user: user.teacherID,
        password: req.body.password
      }
      return res.send({ data, message: "Registered" });
    }
  } catch (error) {
    console.error(error);
    return res.send({ message: "Error" });
  }
});


router.post("/login", async (req, res) => {
  const { ID, password } = req.body;
  console.log(ID, password)
  try {
    const teacher = await TeacherModel.findOne({ teacherID: ID });
    console.log(teacher)
    if (teacher) {
      // Compare the entered password with the hashed password

      const match = await bcrypt.compare(password, teacher.password);
      console.log(match)
      if (match) {
        const token = jwt.sign({ foo: "bar" }, process.env.key, {
          expiresIn: "24h",
        });
        return res.send({ message: "Successful", user: teacher, token: token });
      }
    }

    res.send({ message: "Wrong credentials" });
  } catch (error) {
    console.log({ message: "Error" });
    console.log(error);
  }
});

//fetch ProfileImage
router.post("/fetchimage", async (req, res) => {
  try {
    const teacher = await TeacherModel.findOne({ _id: req.body.id });
    if (!teacher) {
      // Handle case when teacher is not found
      return res.status(404).json({ error: "Teacher not found" });
    }
    const imagePath = teacher.image;
    res.json({ imagePath });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.patch("/:teacherId", async (req, res) => {
  const id = req.params.teacherId;
  const payload = req.body;
  try {
    await TeacherModel.findByIdAndUpdate({ _id: id }, payload);
    const teacher = await TeacherModel.findById(id);
    if (!teacher) {
      return res
        .status(404)
        .send({ message: `Teacher with id ${id} not found` });
    }
    res.status(200).send({ message: `Teacher Updated`, user: teacher });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:teacherId", async (req, res) => {
  const id = req.params.teacherId;
  try {
    const teacher = await TeacherModel.findByIdAndDelete({ _id: id });
    if (!teacher) {
      res.status(404).send({ msg: `Teacher with id ${id} not found` });
    }
    res.status(200).send(`Teacher with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

router.post("/findStudents", async (req, res) => {
  try {
    const classdata = req.body.value
    const classId = await Myclass.findOne({ name: classdata[0] })
    const student = await StudentModel.find({ $and: [{ classname: classId._id }, { division: classdata[1] }] })
    console.log(student);
    if (student) {
      res.status(200).send(student)
    } else {
      res.status(200).json({ message: "no student" })
    }
  } catch (error) {
    console.log(error);
  }
})

router.post("/setMarks", async (req, res) => {
  try {
    const { id, subject, mark, term } = req.body
    console.log(req.body);
    const student = await StudentModel.updateOne({ _id: id }, { $set: { [`marks.${term}.${subject}`]: mark } }, { upsert: true })
    console.log(student);
    if (student) {
      res.status(200).send(student)
    } else {
      res.status(200).json({ message: "no student" })
    }
  } catch (error) {
    console.log(error);
  }
})

//show class students
router.post("/classStudnets", async (req, res) => {
  try {
    const { classname, division } = req.body
    const student = await StudentModel.find({ $and: [{ classname: classname }, { division: division }] })
    if (student) {
      res.status(200).send(student)
    } else {
      res.status(200).json({ message: "no student" })
    }
  } catch (error) {
    console.log(error);
  }
})
//show attendance data
router.post("/attendancedata", async (req, res) => {
  try {
    const { classname, division } = req.body
    const attendance = await studentAttendance.find({ $and: [{ classname: classname }, { division: division }] })
    if (attendance) {
      res.status(200).send(attendance)
    } else {
      res.status(200).json({ message: "no student" })
    }
  } catch (error) {
    console.log(error);
  }
})
//mark attendance
router.post('/markattendance', async (req, res) => {
  try {

    const DateNow = new Date().toISOString().split('T')[0];
    console.log(DateNow, req.body.formattedDate)
    const currentDate = new Date(DateNow);
    const formattedDate = new Date(req.body.formattedDate)
    const timeDifferences = Math.abs(currentDate - formattedDate);
    const millis = 1000 * 60 * 60 * 24;
    const dayDiffference = Math.floor(timeDifferences / millis);
    console.log("attendance", req.body)
    if (dayDiffference < 7) {
      const attendanceDate = await studentAttendance.updateOne({
        student: req.body.studentID, date: {
          $gte: req.body.formattedDate + 'T00:00:00.000+00:00',
          $lte: req.body.formattedDate + 'T23:59:59.999+00:00',
        }
      }, { $set: { state: req.body.attendance, student: req.body.studentId, date: req.body.formattedDate, class: req.body.classname, division: req.body.division } }, { upsert: true })
      if (attendanceDate) {
        res.status(200).json({ message: "added" })
      } else {
        res.status(200).json({ message: "not added" })
      }
    } else {
      res.status(200).json({ message: "unable to mark time expired!" })
    }
  } catch (error) {
    console.log(error)
  }
})

//find Students

router.get("/datelist", async (req, res) => {
  try {
    const data = await studentAttendance.aggregate([
      {
        $group: {
          _id: "$date"
        }
      }, {
        $project: {
          _id: 1,
        }
      }, {
        $limit: 5
      }
    ])
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(200).json({ message: "no records found!" })
    }
  } catch (error) {
    console.log(error);
  }
})

//apply leave
router.post('/applyleave', async (req, res) => {
  console.log(req.body)
  try {

  } catch (error) {

  }
})
module.exports = router;
