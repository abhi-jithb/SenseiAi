import React, { useState } from 'react'
import "./otp.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Otp = () => {

    const [op,setOp]=useState({
        otp:"",
        email:""
    })
    const navigate = useNavigate()
    const checkOtp = async ()=>{
        const n1 = document.getElementById("otp-input1").value;
        const n2 = document.getElementById("otp-input2").value;
        const n3 = document.getElementById("otp-input3").value;
        const n4 = document.getElementById("otp-input4").value;

        setOp({otp:n1.concat(n2,n3,n4),
        email:localStorage.getItem("semail")})
        console.log(op)
        try {
            const response = await axios.post(
              'http://localhost:8000/verifyOtp',
              op
            );
        
            if (response.status === 200) {
              // successful
              navigate('/otp/respass');
              
            } else {
              // Handle sign in error
              console.log(response);
            }
          } catch (error) {
            console.log('Error occurred while signing in:', error);
          }
        
    }
  return (
    <div>
      <form className="otp-Form">
 
 <span className="mainHeading">Enter OTP</span>
 <p className="otpSubheading">We have sent a verification code to your email</p>
 <div className="inputContainer">
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input1"/>
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input2"/>
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input3"/>
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input4"/> 
  
 </div>
  <button className="verifyButton" type="button" onClick={checkOtp}>Verify</button>
    
    
</form>



    </div>
  )
}

export default Otp
