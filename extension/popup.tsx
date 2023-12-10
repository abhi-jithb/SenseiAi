import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import Land from "~components/Land"
import "./style.css"
import Home from "~components/Home"
import History from "~components/History"
import Settings from "~components/Settings"
import OtpMail from "./components/OtpMail"
import Otp from "./components/Otp"
import ResPass from "./components/ResPass"
function IndexPopup() {
  const loggedIn = window.localStorage.getItem("isLoggedIn")
  
  console.log(loggedIn)


  return (
    <div className="body">
      <HashRouter>
        <Routes>
          {
            loggedIn ?
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/home/land" element={<Land />}/>
            <Route path="/otpmail" element={<OtpMail/>}/>
            <Route path="/otp" element={<Otp/>}/>
            <Route path="/otp/respass" element={<ResPass/>}/>
              <Route path="/land" element={<Land />} />
                <Route path="/history"element={<History/>}/>
                <Route path="/settings"element={<Settings/>}/>
                </>
              :
              <>
                <Route path="/" element={<Land />} />
                <Route path="/land" element={<Land />} />
                <Route path="/otpmail" element={<OtpMail/>}/>

                <Route path="/otp" element={<Otp/>}/>
            <Route path="/otp/respass" element={<ResPass/>}/>
                <Route path="/home" element={<Home />} />
                <Route path="/history"element={<History/>}/>
                <Route path="/settings"element={<Settings/>}/>

              </>
          }

        </Routes>

      </HashRouter>

    </div>
  )
}

export default IndexPopup
