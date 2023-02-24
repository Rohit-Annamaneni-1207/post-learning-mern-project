import {React, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import './App.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/RegisterUser';
import { render } from '@testing-library/react';

const axios = require('axios').default;

async function axiosGetLogin(email, pwd) // restricted word await showing up on async func
{
  const response = await axios.get(':8000/login', {
      params: {
        email: email,
        pwd: pwd
      }
    }).catch((err)=>{console.log(err)});

    await Promise.resolve(response);

    return response.data;
}

async function axiosPostRegister(email, pwd) // restricted word await showing up on async func
{

  const data = {
    email: email,
    pwd: pwd
  };

  const response = await axios({
    method: 'post',
    url: " :8000/register", 
    data: data}
    ).catch((err)=>{console.log(err)});

    await Promise.resolve(response);

    return response.data;
}

async function handleEmail()
{
  const recipient = document.getElementById('recipient').value;

  console.log(recipient);

  await axios({
    method: 'post',
    url: ":8000/sendEmail", 
    data: {
      recipient: recipient
    }
  }).then((response)=>{window.open(response.data.preview_url, '_blank');});
}

// var crypto = require("crypto");

function App() {

  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [userSchedules, setSchedules] = useState([]);

  const registerHandler = (event)=>{
    event.preventDefault();
    let email = document.getElementById("email").value;
    let pwd = document.getElementById("pwd").value;

    const regResponse = axiosPostRegister(email, pwd);

    regResponse.then((regResponse)=>{
      let generatedToken = "";
      let tempid = "";

      generatedToken = Math.random().toString(36).substring(3,9);
      setToken(generatedToken);
      tempid = regResponse._id;
      setId(tempid);

      // console.log(generatedToken, id);

      const data = {
        id: tempid,
        token: generatedToken
      }

      axios({
        method: 'post',
        url: ":8000/assignToken", 
        data: data}
        );

    })

  }

  const loginHandler = (event)=>{

    event.preventDefault()
    let email = document.getElementById("email").value;
    let pwd = document.getElementById("pwd").value;

    const loginResponse = axiosGetLogin(email, pwd);

    loginResponse.then((loginResponse)=>{
      let generatedToken = "";
      let tempid = "";

      generatedToken = Math.random().toString(36).substring(3,9);
      tempid = loginResponse._id;
      

      // console.log(generatedToken, id);

      const data = {
        id: tempid,
        token: generatedToken
      }

      axios({
        method: 'post',
        url: ":8000/assignToken", 
        data: data}
        );

      axios({
        method: "get",
        url: ":8000/userSchedules",
        params: {user_id: tempid}
      }).then((response)=>{setSchedules(response.data)});

        setId(tempid);
        setToken(generatedToken);
    }); //promise fullfilled
  }

  const handleUnload = (event)=>{
    const data = {
      token:token
    };

    axios({
      method: 'post',
      url: ":8000/removeToken",
      data: data
    }).then((result)=>{console.log(result)});

  };

  const handleNewSchedule = (event)=>{
    event.preventDefault()
    // console.log(event.target);
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const venue = document.getElementById('venue').value;

    const data = {
      date: date,
      time: time,
      venue: venue,
      user_id: id
    }

    axios({
      method: 'post',
      url: ":8000/new_schedule",
      data: data
    }).then((result)=>{console.log(result.data);
        const newScheduleList = [...userSchedules, result.data];
        setSchedules(newScheduleList);
  });

    
  }

  const delete_schedule = (schedule_id)=>{
    setSchedules(existing=> existing.filter(schedule=> schedule._id != schedule_id));

    axios({
      method: 'post',
      url: ":8000/delete_schedule",
      data: {schedule_id: schedule_id}
    }).then((result)=>{console.log(result)});
  }

  if (!token)
  {
    return (<Router>
      <Routes>

      <Route path="/" exact={true} element={ <Login loginHandler={loginHandler}/>}>
      </Route>

      <Route path = "/register" exact={true} element={ <Register registerHandler={registerHandler}/>}>
      </Route>

      </Routes>
    </Router>)
  }

  return (<Router>

    <Routes>

      <Route path = "/" exact = {true} element={ <Dashboard token={token} id={id} handleUnload={handleUnload} handleNewSchedule={handleNewSchedule} handleEmail = {handleEmail} scheduleList={userSchedules} deleteSchedule={delete_schedule}/>}>
      </Route>

      <Route path = "/register" exact = {true} element={ <Navigate to="/"/> }>
      </Route>

    </Routes>

  </Router>);
}

export default App;
