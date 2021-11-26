import React, { useState } from "react";
import "./AuthView.scss";
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from "@mui/material";
import { ButtonStyles, textFieldStyles, ButtonStyles2 } from "./styles";
import { createUser, loginUser } from "../../firebase/firebase.utils";
import { signinUser, signoutUser } from "../../actions";
import { connect } from "react-redux";
import { database } from "../../firebase/firebase.utils";
import { collection, getDoc, doc } from "firebase/firestore"; 
import { getUserWithId } from "../../firebase/firebase.utils";
import { onAuthStateChanged } from "@firebase/auth";

const AuthView = ({signinUser, signoutUser, authStatus}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
      if (isLogin) {
          setLoginForm({
              ...loginForm, [e.target.id] : e.target.value
          })
      }
      if (!isLogin) {
          setSignupForm({
              ...signupForm, [e.target.id] : e.target.value
          })
      }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (isLogin)  {
        loginUser(loginForm);

      }
      else  {
        if (signupForm.confirmPassword!==signupForm.password) {
          alert('PASSWORDS DONT MATCH! TRY AGAIN!!!')
          return;
        }
        createUser(signupForm);
      }
  };







  return (
    <>
      <div className="authview" style={isLogin?{marginTop:'7rem'}:{marginTop:'2rem'}}>
        <div className="authview__container">
          <div className="authview__navigation">
            <div
              className={`authview__navigation__item${isLogin && " active-x"}`}
              onClick={() => setIsLogin(true)}
            >
              Log In
            </div>
            <div
              className={`authview__navigation__item${!isLogin && " active-x"}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </div>
          </div>
          <div className="authview__content">
            {isLogin && (
              <div className="authview__content__login">
                <form className="authview__content__login__form" onSubmit={handleSubmit}>
                  <TextField
                    variant="outlined"
                    onChange={handleChange}
                    value={loginForm.email}
                    label="Email"
                    id="email"
                    type="email"
                  />
                  <TextField
                    style={textFieldStyles}
                    id="password"
                    onChange={handleChange}
                    value={loginForm.password}
                    variant="outlined"
                    type="password"
                    label="Password"
                  />
                  <Button style={ButtonStyles} variant="contained" onClick={handleSubmit}>
                    Enter
                  </Button>
                </form>
              </div>
            )}
            {!isLogin && (
              <div className="authview__content__login">
                <form className="authview__content__login__form" onSubmit={handleSubmit}>
                  <TextField
                    variant="outlined"
                    onChange={handleChange}
                    value={signupForm.fullname}
                    label="Full Name"
                    style={textFieldStyles}
                    id="fullname"
                  />
                  <TextField
                    variant="outlined"
                    onChange={handleChange}
                    value={signupForm.email}
                    label="Email"
                    style={textFieldStyles}
                    id="email"
                  />

        
                  <TextField
                    style={textFieldStyles}
                    id="password"
                    onChange={handleChange}
                    value={signupForm.password}
                    variant="outlined"
                    type="password"
                    label="Password"
                  />
                  <TextField
                    style={textFieldStyles}
                    id="confirmPassword"
                    onChange={handleChange}
                    value={signupForm.confirmPassword}
                    variant="outlined"
                    type="password"
                    label="Confirm Password"
                  />
                  <Button style={ButtonStyles} variant="contained" onClick={handleSubmit}>
                    Join the magic!
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state)=>{
  return {
    authStatus : state.authStatus,
  }
}

export default connect(mapStateToProps, {
  signinUser, signoutUser
})(AuthView);
