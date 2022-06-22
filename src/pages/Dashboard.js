import {React, useState} from 'react';
import Schedule_card from '../components/Schedule_card';

const Dashboard = (props) =>{

    window.addEventListener('beforeunload', (event)=>{
        props.handleUnload(event);
    });

    
    return (
        <div>
    <h2>Dashboard</h2>
    <h1>Create Schedule</h1>
    <form onSubmit={props.handleNewSchedule}>
    <input type="date" id="date"></input>
    <input type="time" id="time"></input>
    <input type = "text" id="venue"></input>
    <button type="submit">submit</button>
    </form>
    {props.scheduleList.map((schedule)=>{
            console.log(schedule)
            return(<Schedule_card key={schedule._id} schedule={schedule} delete={props.deleteSchedule}/>)
    })}
    </div>
    );
};

export default Dashboard;