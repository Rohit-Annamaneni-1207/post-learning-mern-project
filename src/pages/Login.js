import React from 'react';
// import { Link } from 'react-router-dom';

const Login = (props) =>{

    return(<div>
    {/* <form onSubmit={props.loginHandler}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email"></input>
        <br/>
        <label htmlFor="pwd">Password</label>
        <input type="password" name="pwd" id="pwd"></input>
        <br />
        <button type="submit" value="submit">Submit</button>
    </form> */}

<form onSubmit={props.loginHandler}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="pwd" className="form-label">Password</label>
    <input type="password" className="form-control" id="pwd"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  </form>

    <br/>
    <a href='/register'>Register</a>
    </div>
    );
};

export default Login;