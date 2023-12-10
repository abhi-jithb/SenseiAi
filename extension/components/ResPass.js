import React, { useState } from 'react';
import { Alert, Stack } from '@mui/material';
import "./settings.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ResPass = () => {
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
    email: ""
  });
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword((prevState) => ({
      ...prevState,
      password: value
    }));
  };

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setPassword((prevState) => ({
      ...prevState,
      confirmPassword: value
    }));
  };

  const resetPassword = () => {
    if (password.password !== password.confirmPassword) {
      // Passwords don't match, handle the error here
      console.log("Passwords do not match");
      return;
    }

    setPassword((prevState) => ({
      ...prevState,
      email: localStorage.getItem("semail")
    }));

    console.log(password);

    axios.post('http://localhost:8000/updatePassword', password)
      .then(response => {
        console.log(response);
        navigate("/land");
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div style={{
      backgroundColor: "#E0E5EC",
      width: "1000px",
      height: "auto",
      padding: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div className="box" style={{ height: "400px" }}>
        <Stack alignItems={'center'}>
          <h3 style={{ fontFamily: "Poppins", fontSize: "30px" }}>Change Password</h3>
          <input
            type="password"
            className="form__input"
            placeholder="Password"
            value={password.password}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            className="form__input"
            placeholder="Confirm Password"
            value={password.confirmPassword}
            onChange={handleConfirmPasswordChange}
          />

          <div className="btn btn__primary"style={{ fontSize: "15px", width: "250px" }} onClick={resetPassword}>
            <p >Reset Password</p>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default ResPass;
