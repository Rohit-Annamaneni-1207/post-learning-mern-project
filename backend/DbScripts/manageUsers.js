const mongoose = require('mongoose');
const User = require('../Schemas/Users');

// const url = "mongodb+srv://Rohit_Annamaneni:greatboy@cluster0.zxjmn.mongodb.net/?retryWrites=true&w=majority";
const url = "mongodb+srv://Rohit_Annamaneni:greatboy@cluster0.0jccdrl.mongodb.net/test"
mongoose.connect(url).then(()=>{console.log('connected')}).catch((err)=>{console.log(err)});

const createUser = async (req, res, next)=>{
    const queriedUsers = await User.find({email: req.body.email}).exec();

    if (queriedUsers.length === 0)
    {
        const createdUser = new User({
            email: req.body.email,
            pwd: req.body.pwd,
            schedules: [],
            token: ""
        });


        const result = await createdUser.save();

        res.status(200).json(result);
    }
    else
    {
        res.status(409).send("user exists");
    }
};

const loginUser = async (req, res, next)=>{
    // console.log(req.params);
    const queriedUsers = await User.find({email: req.query.email, pwd: req.query.pwd}).exec();

    if (queriedUsers.length === 0)
    {
        res.status(401).send("user does not exist");
    }
    else
    {
        res.status(200).json(queriedUsers[0]);
    }
}

const assignToken = async (req, res, next) => {
    const id = req.body.id;
    const result = await User.findByIdAndUpdate(id, {token: req.body.token}).exec();
    res.send(result);
}

const removeToken = async (req, res, next) => {
    console.log("remove token post req called");
    const token = req.body.token;
    console.log(token);
    const result = await User.findOneAndUpdate({token: token}, {token: ""}).exec();
    console.log(result);
    res.send(result);
}

exports.createUser = createUser;

exports.loginUser = loginUser;

exports.assignToken = assignToken;

exports.removeToken = removeToken;