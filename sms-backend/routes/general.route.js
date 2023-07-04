const express = require('express');
const bcrypt =require('bcrypt')
const router = express.Router();
const { TeacherModel } = require('../models/teacher.model');
const { StudentModel } = require('../models/student.model');
const { AdminModel } = require('../models/admin.model');
const nodemailer = require('nodemailer');
require("dotenv").config()
let otp;
let user;
let userName;
let userID
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MID,
    pass: process.env.MPD,
  },
});

router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  
  try {
    const student = await StudentModel.findOne({ email: email });
    const teacher = await TeacherModel.findOne({ email: email });
    const admin = await AdminModel.findOne({ email: email });

    if (student || teacher || admin) {
        //storing user
        if(student){
            user=email
            userName="student"
            userID= await StudentModel.findOne({email:email})
            userID= userID.studentID
        }
        if(teacher){
            user=email
            userName="teacher"
            userID= await TeacherModel.findOne({email:email})
            userID= userID.teacherID
        }
        if(admin){
            user=email
            userName="admin"
            userID= await AdminModel.findOne({email:email})
            userID= userID.adminID

        }
      // Generate a 4-digit OTP

       otp = Math.floor(1000 + Math.random() * 9000);
        console.log("otp:"+otp)
      // Send the OTP via email
      const mailOptions = {
        from: process.env.MID,
        to: email,
        subject: 'Password Reset OTP',
        text: `Hy user ${userID} Your OTP for password reset is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(200).json({message:"Failed to send OTP"});
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({message:"OTP sent successfully"});
        }
      });
    } else {
      console.log('no user found');
      return res.status(200).json({message:"Wrong credentials"});
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({message:"Something went wrong"});
  }
});

//VerifyOtp

router.post("/Verifyotp", async(req,res)=>{
    try {
        console.log(req.body)
        console.log(otp)
        if(req.body.otp==otp){
            res.status(200).json({message:"Success"})
        }else{
            res.status(200).json({message:"invalid OTP!"})
        }
    } catch (error) {
        
    }
})

router.post('/resetpassword', async (req, res) => {
    try {
        
      const { password1 } = req.body;
  
      if (userName === 'admin') {
        const hashedPassword = await bcrypt.hash(password1, 10);
        await AdminModel.updateOne({ email: user }, { password: hashedPassword });
        // Password reset for admin is successful
        res.status(200).json({ message: 'Password reset successful' });
      } else if (userName === 'student') {
        const hashedPassword = await bcrypt.hash(password1, 10);
        await StudentModel.updateOne({ email: user }, { password: hashedPassword });
        // Password reset for student is successful
        res.status(200).json({ message: 'Password reset successful' });
      } else if (userName === 'teacher') {
        const hashedPassword = await bcrypt.hash(password1, 10);
        await TeacherModel.updateOne({ email: user }, { password: hashedPassword });
        // Password reset for teacher is successful
        res.status(200).json({ message: 'Password reset successful' });
      } else {
        // No user found
        res.status(200).json({ message: 'No user found' });
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({ message: 'Something went wrong' });
    }
  });
  
  //login
  router.post("/login",async (req,res)=>{
    try {
      const id = req.body.ID;
       const   logindataAdmin = await AdminModel.findOne({adminID:id});
       const  logindataStudent = await StudentModel.findOne({studentID:id});
       const  logindataTeacher = await TeacherModel.findOne({teacherID:id});
       if(logindataAdmin){
        return res.status(200).json({message:"Admin"})
       }
       else if(logindataStudent){
        return res.status(200).json({message:"Student"})
       }
       else if(logindataTeacher){
        return res.status(200).json({message:"Teacher"})
       }else{
        return res.status(200).json({message:"invalid"})
       }

    } catch (error) {
      
    }
  })

module.exports = router;
