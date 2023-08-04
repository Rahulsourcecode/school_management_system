const express = require("express")
const { connection } = require("./Config/db")
require("dotenv").config();
const cors = require("cors");
const morgan = require('morgan')

const adminRouter = require('./routes/admin.route')
const teacherRouter = require('./routes/teacher.route')
const studentRouter = require('./routes/student.route');
const generalRouter = require('./routes/general.route');

const app = express()

app.use(express.json())
app.use(cors());
app.use(express.static('public'));
morgan('default')
app.get("/", (req, res) => {
    res.send("Homepage")
})

app.use("/admin", adminRouter);
app.use('/teachers', teacherRouter);
app.use('/students', studentRouter);
app.use("/general", generalRouter);

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connected to DB");
    } catch (error) {
        console.log("Unable to connect to DB");
        console.log(error);
    }
    console.log(`Listening at port ${process.env.PORT}`);
})



