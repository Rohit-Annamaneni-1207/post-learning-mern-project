import React from 'react'

const Schedule_card = (props)=>{
    return (

    <div className="card" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{props.schedule.date}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{props.schedule.time}</h6>
    <p className="card-text">{props.schedule.venue}</p>
    <p><input type="email" id="recipient" placeholder='recipient@email.com'></input></p>
    <p><button onClick={props.handleEmail}>Notify</button></p>
    <button type="button" onClick={()=>{props.delete(props.schedule._id)}} className="btn btn-outline-danger">Delete</button>
  </div>
</div>
    
    );
};

export default Schedule_card;