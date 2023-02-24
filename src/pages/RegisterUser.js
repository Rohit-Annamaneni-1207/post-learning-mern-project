import React from 'react';

const Register = (props) =>{
    return (

<form onSubmit={props.registerHandler}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="pwd" className="form-label">Password</label>
    <input type="password" className="form-control" id="pwd"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  </form>
);
};

export default Register;