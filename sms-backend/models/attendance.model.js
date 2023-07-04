const mongoose = require('mongoose')

const attendanceShema = mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    student:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
      }]
})