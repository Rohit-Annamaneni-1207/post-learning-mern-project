const express = require('express');
const BodyParser = require('body-parser');

var cors = require('cors');

const createUser = require("./DbScripts/manageUsers").createUser;
const loginUser = require("./DbScripts/manageUsers").loginUser;
const assignToken = require("./DbScripts/manageUsers").assignToken;
const removeToken = require("./DbScripts/manageUsers").removeToken;


const createSchedule = require("./DbScripts/manageSchedules").createSchedule;
const userSchedules = require("./DbScripts/manageSchedules").userSchedules;
const deleteSchedule = require("./DbScripts/manageSchedules").deleteSchedule;

const PORT = process.env.port || 5000;

const nodemailer = require("nodemailer");

const sendEmail = async (req, res, next)=>{

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'fyqve3u4w55wgbm4@ethereal.email',
            pass: '1AhZazsUQU333zu28j'
        }
    });

      let info = await transporter.sendMail({
        from: "SCMA <no-reply@gmail.com>", // sender address
        to: req.body.recipient, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      transporter.sendMail(info, (err, info)=>{
        if (err)
        {
            console.log(err);
        }
        else{
            console.log(info);
        }
      })

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      const jsonresult = {
        preview_url : nodemailer.getTestMessageUrl(info)
      } 
      res.json(jsonresult);
};

const app = express();

app.use(cors());

app.use(BodyParser.json());

app.get("/login", loginUser);

app.post("/register", createUser);

app.post("/assignToken", assignToken);

app.post("/removeToken", removeToken);

app.post("/new_schedule", createSchedule);

app.get("/userSchedules", userSchedules);

app.post("/delete_schedule", deleteSchedule);

app.post("/sendEmail", sendEmail);

app.listen(PORT);