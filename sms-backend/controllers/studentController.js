const { StudentModel } = require("../models/student.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const studentLogin = async (req, res) => {
    const { studentID, password } = req.body;
    try {
      const student = await StudentModel.findOne({ studentID, password });
  
      if (student) {
        const token = jwt.sign({ foo: "bar" }, process.env.key, {
          expiresIn: "24h",
        });
        res.send({ message: "Successful", user: student, token: token });
      } else {
        res.send({ message: "Wrong credentials" });
      }
    } catch (error) {
      console.log({ message: "Error" });
      console.log(error);
    }
  };


  const editStudent =  async (req, res) => {
    const id = req.params.studentId;
    const payload = req.body;
    try {
      await StudentModel.findByIdAndUpdate({ _id: id }, payload);
      const student = await StudentModel.findById(id);
      if (!student) {
        return res.status(404).send({ message: `Student with id ${id} not found` });
      }
      res.status(200).send({ message: `Student Updated`, user: student });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "Something went wrong, unable to Update." });
    }
  };


  const fetchImage  = async (req, res) => {
    try {
      const student = await StudentModel.findOne({ _id: req.body.id });
      if (!student) {
        // Handle case when teacher is not found
        return res.status(404).json({ error: "Student not found" });
      }
      const imagePath = student.image;
      res.json({ imagePath });
    } catch (error) {
      // Handle any errors that occurred during the process
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
const deleteStudent =  async (req, res) => {
    const id = req.params.studentId;
    try {
      const student = await StudentModel.findByIdAndDelete({ _id: id });
      if (!student) {
        res.status(404).send({ msg: `Student with id ${id} not found` });
      }
      res.status(200).send(`tudent with id ${id} deleted`);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "Something went wrong, unable to Delete." });
    }
  };
  
  module.exports={
    studentLogin,
    editStudent,
    fetchImage,
    deleteStudent
  }