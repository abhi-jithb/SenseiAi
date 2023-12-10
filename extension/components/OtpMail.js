import React, { useState } from 'react';
import { Stack } from '@mui/material';
import "./settings.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const OtpMail = () => {
  const [mail, setMail] = useState({
    email: ""
  });
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setMail((prevState) => ({
      ...prevState,
      email: value
    }));
  };

  const fetchOtp = async () => {
    localStorage.setItem("semail", mail.email);

    try {
      const response = await axios.post(
        'http://localhost:8000/resetPassword',
        mail
      );

      if (response.status === 200) {
        // successful
        navigate('/otp');
      } else {
        // Handle sign in error
        console.log(response);
      }
    } catch (error) {
      console.log('Error occurred while signing in:', error);
    }
  };

  return (
    
      <form class="subscribe-form">
    <input type="email" placeholder="example@mail.com" class="subscribe-input"value={mail.email}
    onChange={handleEmailChange}/>
    <button class="subscribe-btn" onClick={fetchOtp}>Submit</button>
</form>
    
  );
};

export default OtpMail;
