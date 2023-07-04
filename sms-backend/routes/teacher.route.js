const express = require("express");
const { TeacherModel } = require("../models/teacher.model");
const { AdminModel } = require("../models/admin.model");
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {uploads} = require("../middlewares/multer")
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


router.post("/register",uploads.single('image'), async (req, res) => {
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
        teacherID:Date.now(),
        image: req.file.filename,
      ...otherFields,
    });
    // Save the teacher to the database
    await teacher.save();

    // Retrieve the saved teacher data
    const data = await TeacherModel.findOne({ email });

    // Return a success response
    return res.send({ data, message: "Registered" });
  } catch (error) {
    console.error(error);
    return res.send({ message: "Error" });
  }
});


router.post("/login", async (req, res) => {
  const { docID, password } = req.body;
  try {
    const teacher = await TeacherModel.findOne({ docID });

    if (teacher) {
      // Compare the entered password with the hashed password
      const match = await bcrypt.compare(password, teacher.password);

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
    console.log(imagePath);
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

module.exports = router;
