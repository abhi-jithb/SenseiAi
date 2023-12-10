import React, { useEffect } from 'react';
import './Land.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SignInLoader from './SignInLoader';
const Land = () => {
  useEffect(() => {
    const switchCtn = document.querySelector("#switch-cnt");
    const switchC1 = document.querySelector("#switch-c1");
    const switchC2 = document.querySelector("#switch-c2");
    const switchCircle = document.querySelectorAll(".switch__circle");
    const switchBtn = document.querySelectorAll(".switch-btn");
    const aContainer = document.querySelector("#a-container");
    const bContainer = document.querySelector("#b-container");
    const allButtons = document.querySelectorAll(".submit");

    const getButtons = (e) => e.preventDefault();

    const changeForm = (e) => {
      switchCtn.classList.add("is-gx");
      setTimeout(function () {
        switchCtn.classList.remove("is-gx");
      }, 1500);

      switchCtn.classList.toggle("is-txr");
      switchCircle[0].classList.toggle("is-txr");
      switchCircle[1].classList.toggle("is-txr");

      switchC1.classList.toggle("is-hidden");
      switchC2.classList.toggle("is-hidden");
      aContainer.classList.toggle("is-txl");
      bContainer.classList.toggle("is-txl");
      bContainer.classList.toggle("is-z200");
    };

    const mainF = () => {
      for (let i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons);
      for (let i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm);
    };

    mainF();

    // Clean up event listeners when component is unmounted
    return () => {
      for (let i = 0; i < allButtons.length; i++)
        allButtons[i].removeEventListener("click", getButtons);
      for (let i = 0; i < switchBtn.length; i++)
        switchBtn[i].removeEventListener("click", changeForm);
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });
  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate()
  const [darkMode,setDarkMode] = useState(false)

  const toggleTheme = ()=>{
    setDarkMode(!darkMode)
  }


  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("I am here")
    navigate('/home');

  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    navigate('/home');
      
  };
    

  const handleSignInInputChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUpInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  return (
    <div className="main">
      <div className="container a-container" id="a-container">
      <form className="form" id="a-form" onSubmit={handleSignUp}>
        
          <h2 className="form_title title">Create Account</h2>
          {/* <div className="form__icons" onClick={()=>{}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16"> <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/> </svg>
      </div>
          <span className="form__span">or use email for registration</span> */}
          <input
            className="form__input"
            type="text"
            placeholder="username"
            name="username"
            value={signUpData.username}
            onChange={handleSignUpInputChange}
          />
          <input
            className="form__input"
            type="text"
            placeholder="Email"
            name="email"
            value={signUpData.email}
            onChange={handleSignUpInputChange}
          /><input
            className="form__input"
            type={ 'password'}
            placeholder="Password"
            name="password"
            value={signUpData.password}
            onChange={handleSignUpInputChange}
          />
          
          {isLoggingIn ? (<SignInLoader/>):(<button className="form__button button submit" type="submit" onClick={handleSignUp}>
            SIGN UP
          </button>)}
</form>
      </div>

      <div className="container b-container" id="b-container">
        <form className="form" id="b-form" onSubmit={handleSignIn}>
          <h2 className="form_title title">Sign in to Website</h2>
          {/* <div className="form__icons" onClick={()=>{}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16"> <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/> </svg>
          </div>
          <span className="form__span">or use your email account</span> */}
          <input
            className="form__input"
            type="text"
            placeholder="Email"
            name="email"
            value={signInData.email}
            onChange={handleSignInInputChange}
          />
          <input
            className="form__input"
            type="password"
            placeholder="Password"
            name="password"
            value={signInData.password}
            onChange={handleSignInInputChange}
          />
          <Link to={"/otpmail"} style={{textDecoration:"none"}}>
          <a className="form__link">Forgot your password?</a>

          </Link>
          {isLoggingIn ? (<SignInLoader style={{margin:"20px"}} />) : (<button className="form__button button" type="submit" onClick={handleSignIn}>SIGN IN</button>)} 
        </form>
      </div>

      <div className="switch" id="switch-cnt">
        <div className="switch__circle"></div>
        <div className="switch__circle switch__circle--t"></div>

        <div className="switch__container" id="switch-c1">
<div class="neumorphic-div">
  <h1 class="neumorphic-text">SenseiAI</h1>
</div>

          <h2 className="switch__title title">Welcome Back!</h2>
          <p className="switch__description description">
            To keep connected with us, please login with your personal info
          </p>
          <button className="switch__button button switch-btn">SIGN IN</button>
        </div>

        <div className="switch__container is-hidden" id="switch-c2">
          <h2 className="switch__title title">Hello Friend!</h2>
          <p className="switch__description description">
            Enter your personal details and start the journey with us
          </p>
          <button className="switch__button button switch-btn">SIGN UP</button>
        </div>
      </div>
    </div>
  );
};

export default Land;
