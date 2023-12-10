import { Home } from "@mui/icons-material"
import EditIcon from "@mui/icons-material/Edit"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"
import { Stack, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { poppins } from '@fontsource/poppins';
import {Link} from "react-router-dom"
import History from "@mui/icons-material/History"
import "./settings.css"
import "./home.css"
const Settings = () => {


  const saveChanges = () =>{
    if(document.getElementById("prompt").value!=""){
      window.localStorage.setItem("prompt",document.getElementById("prompt").value)
    }
    if(document.getElementById("imstyle").value!=""){
      window.localStorage.setItem("imstyle",document.getElementById("imstyle").value)
    }
    if(document.getElementById("colang").value!=""){
      window.localStorage.setItem("colang",document.getElementById("colang").value)
    }

  }
  return (
    <div
      style={{
        backgroundColor: "#E0E5EC",
        width: "1000px",
        height: "auto",
        padding: "20px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}>
      <div className="box">
        <Stack alignItems={'center'}>
          <Stack direction={"column"} alignItems={"flex-end"} padding={"20px"}>
            <Stack direction={"row"} sx={{ padding: "20px", gap: "10px" }}>
            <Link to="/land">

<button class="neumorphic-button">
<span class="icon">
<PowerSettingsNewIcon/>

</span>
</button>
</Link>
              <Link to="/home">

              <button class="neumorphic-button">
                <span class="icon">
                  <Home />
                </span>
              </button>
              </Link>
<Link to="/history">
              <button class="neumorphic-button">
                <span class="icon">
                  <History />
                </span>
              </button>
              </Link>
            </Stack>
          </Stack>
      <h3 style={{fontFamily:"Poppins",fontSize:"30px"}}>Configure prompts</h3>
      <input type="text" class="form__input" id="prompt" placeholder="Enter Custom Prompt" />
      <input type="text" class="form__input" id="imstyle"placeholder="Enter Image Style" />
      <input type="text" class="form__input" id="colang" placeholder="Enter Language" />
      <div class="btn btn__primary"onClick={saveChanges}><p style={{fontSize:"30px"}}>Save</p></div>


        </Stack>
      </div>
    </div>
  )
}

export default Settings
