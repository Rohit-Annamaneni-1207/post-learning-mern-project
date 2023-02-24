import {React, useState} from 'react';
import Schedule_card from '../components/Schedule_card';

const Dashboard = (props) =>{

    window.addEventListener('beforeunload', (event)=>{
        props.handleUnload(event);
    });

    
    return (
        <div>
            
    <h1><u>Schedule Dashboard</u></h1>
    <h2>Create Schedule</h2>
    <br></br>
    <form onSubmit={props.handleNewSchedule}>
    <input type="date" id="date"></input>
    <input type="time" id="time"></input>
    <input type = "text" id="venue"></input>
    <button type="submit">submit</button>

    <br></br>
    <br></br>
    <h2>Ongoing events</h2>
    </form>
    <br></br>
    {props.scheduleList.map((schedule)=>{
            console.log(schedule)
            return(<Schedule_card key={schedule._id} handleEmail = {props.handleEmail} schedule={schedule} delete={props.deleteSchedule}/>)
    })}
    </div>
    );
};

export default Dashboard;