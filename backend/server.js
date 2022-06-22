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

app.listen(5000);