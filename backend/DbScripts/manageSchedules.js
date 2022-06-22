const mongoose = require('mongoose');
const Schedule = require('../Schemas/Schedules');

const url = "mongodb+srv://Rohit_Annamaneni:greatboy@cluster0.zxjmn.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url).then(()=>{console.log('connected')}).catch((err)=>{console.log(err)});

const createSchedule = async (req, res, next)=>{
    const newSchedule = new Schedule ({
        user_id : req.body.user_id,
        date: req.body.date,
        time: req.body.time,
        venue: req.body.venue,
    });

    const result = await newSchedule.save();
    res.status(200).json(result);
};

const userSchedules = async (req, res, next)=>{
    const queriedSchedules = await Schedule.find({user_id: req.query.user_id});
    res.status(200).json(queriedSchedules);
};

const deleteSchedule = async(req, res, next)=>{
    const deletedSchedule = await Schedule.findByIdAndDelete(req.body.schedule_id);
    res.status(200).json(deletedSchedule);
}

exports.createSchedule = createSchedule;
exports.userSchedules = userSchedules;
exports.deleteSchedule = deleteSchedule;