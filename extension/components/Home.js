import "./home.css"
import "./dark.css"
import EditIcon from "@mui/icons-material/Edit"
import HistoryIcon from "@mui/icons-material/History"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"
import { Avatar, Stack } from "@mui/material"
import axios from "axios"
import React from "react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Lisa from "./Lisa"
import Pencil from "./Pencil"

const { OpenAIApi } = require('openai');



const Home = () => {
  const [selectionText, setSelectionText] = useState("")
  const [text, setText] = useState("")
  const [ansText, setAnsText] = useState("")
  const [dispAns, setDispAns] = useState(false)
  const [customVal, setCustomVal] = useState(
    window.localStorage.getItem("prompt") || "Describe"
  )
  const [codeLang, setCodeLang] = useState(
    window.localStorage.getItem("colang") || "python"
  )
  const [imageUrl1, setImageUrl1] = useState("")
  const [imageUrl2, setImageUrl2] = useState("")
  const [isImage, setIsImage] = useState(false)
  const [imageStyle, setImageStyle] = useState(
    window.localStorage.getItem("imstyle") || "comics"
  )
  const [isTextLoading, setisTextLoading] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [History, setHistory] = useState({
    history: "",
    userId: "",
    token: ""
  })
  const [darkMode, setDarkMode] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    chrome.storage.sync.get(["dict1"], function (result) {
      setSelectionText(result.dict1)
      setText("Selected Text : " + result.dict1)
    })
  }, [])

   const openai = new OpenAIApi({
    api_key: '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'
  });

  const generateText = async (buttonText, tokenValue) => {
    setAnsText("")
    setDispAns(false)
    setIsImage(false)
    setIsImageLoading(false)
    setisTextLoading(true)

    let prompt = ""

    switch (buttonText) {
      case "whatIs":
        prompt = `What is ${selectionText}?`
        break
      case "explain":
        prompt = `Explain ${selectionText}.`
        break
      case "summarize":
        prompt = `Summarize ${selectionText}.`
        break
      case "custom":
        prompt = `${customVal} ${selectionText}.`
        break
      case "code":
        prompt = `Generate code for ${selectionText} in ${codeLang}`
        break
      default:
        prompt = `${buttonText} ${selectionText}.`
    }
    console.log(prompt)
    setText(prompt)

    // setHistory({
    //   history: prompt,
    //   userId: window.localStorage.getItem("userId"),
    //   token: window.localStorage.getItem("token")
    // })
    // console.log(History)
    // const res = await axios.post(
    //   "http://localhost:8000/addHistory",
    //   History
    // )
    console.log(res.data)

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt} `,
      max_tokens: tokenValue,
      temperature: 0.5
    })

    const data = await response

    console.log(data.data.choices[0].text)
    setAnsText(data.data.choices[0].text)
    setisTextLoading(false)
    setDispAns(true)
  }

  const generateImage = async () => {
    setDispAns(false)
    setIsImage(true)
    setisTextLoading(false)
    setIsImageLoading(true)
    const prompt = `Generate image for ${selectionText} in ${imageStyle} style`
    setText(prompt)
    console.log(prompt)
    const response = await openai.createImage({
      prompt: `${prompt} `,
      n: 2,
      size: "1024x1024"
    })
    const data = await response

    // setHistory({
    //   history: prompt,
    //   userId: window.localStorage.getItem("userId"),
    //   token: window.localStorage.getItem("token")
    // })
    // console.log(History)
    // const res = await axios.post(
    //   "http://localhost:8000/addHistory",
    //   History
    // )
    console.log(res.data)
    console.log(data.data.data[1].url)
    setImageUrl1(data.data.data[0].url)
    setImageUrl2(data.data.data[1].url)
    setIsImageLoading(false)
    setDispAns(true)
  }
  const logOut = () => {
    window.localStorage.removeItem("isLoggedIn")
    chrome.runtime.reload()
  }
  const toggleTheme = ()=>{
    setDarkMode(!darkMode)
  }
  const changeSelection = ()=>{
    setSelectionText(document.getElementById("chsel").value)
    setSelectionText(document.getElementById("chsel").value)
    setText(document.getElementById("chsel").value)
    setText(document.getElementById("chsel").value)
    
  }
  return (
    <div
      style={{
        backgroundColor: darkMode ? "#1F1F1F" : "#E0E5EC",
        boxShadow: darkMode
          ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
          : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)",
        width: "1000px",
        height: "auto",
        padding: "20px"
      }}>
      <div
        className="boxHo"
        style={{
          backgroundColor: darkMode ? "#1F1F1F" : "#E0E5EC",
          boxShadow: darkMode
            ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
            : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)"
        }}>
        <Stack>
          <Stack direction={"row"} justifyContent={"space-between"} >
          <label class="switchD" style={{width:"64px",height:"34px",margin:"20px"}}>
  <span class="sun"style={{width:"64px",height:"34px"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
  <span class="moon"style={{width:"64px",height:"34px"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>   
  <input style={{width:"64px",height:"34px"}} type="checkbox" class="inputD"onClick={toggleTheme}/>
  <span style={{width:"64px",height:"34px"}}class="sliderD"></span>
</label>
            <Stack direction={"row"} sx={{ padding: "20px", gap: "10px" }}>
              <button
                class="neumorphic-button"
                style={{
                  backgroundColor: darkMode ? "#1F1F1F" : "#E0E5EC",
                  boxShadow: darkMode
                    ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
                    : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)",
                  color: darkMode ? "#fff" : "#000"
                }}
                onClick={logOut}>
                <span class="icon">
                  <PowerSettingsNewIcon />
                </span>
              </button>
              <Link to="/history">
                <button
                  class="neumorphic-button"
                  style={{
                    backgroundColor: darkMode ? "#1F1F1F" : "#E0E5EC",
                    boxShadow: darkMode
                      ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
                      : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)",
                    color: darkMode ? "#fff" : "#000"
                  }}>
                  <span class="icon">
                    <HistoryIcon />
                  </span>
                </button>
              </Link>
              <Link to="/settings">
                <button
                  class="neumorphic-button"
                  style={{
                    backgroundColor: darkMode ? "#1F1F1F" : "#E0E5EC",
                    boxShadow: darkMode
                      ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
                      : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)",
                    color: darkMode ? "#fff" : "#000"
                  }}>
                  <span class="icon">
                    <EditIcon />
                  </span>
                </button>
              </Link>
            </Stack>
          </Stack>
          <Stack direction={"row"} gap={"30px"} margin={"35px"}>
            <div
              class="btn btn__primary"
              style={{
                boxShadow: darkMode
                  ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
                  : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)"
              }}
              onClick={() => generateText("whatIs", 75)}>
              <p>What is</p>
            </div>
            <div
              class="btn btn__secondary"
              style={{
                backgroundColor: darkMode ? "#1F1F1F" : "#E0E5EC",
                boxShadow: darkMode
                  ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
                  : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)"
              }}
              onClick={() => generateText("explain", 400)}>
              <p>Explain</p>
            </div>
            <div
              class="btn btn__primary"
              style={{
                boxShadow: darkMode
                  ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
                  : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)"
              }}
              onClick={() => generateText("summarize", 400)}>
              <p>Summarize</p>
            </div>
            <div
              class="btn btn__secondary"
              style={{
                backgroundColor: darkMode ? "#1F1F1F" : "#E0E5EC",
                boxShadow: darkMode
                  ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
                  : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)"
              }}
              onClick={() => generateText("custom", 200)}>
              <p>Custom</p>
            </div>
            <div
              class="btn btn__primary"
              style={{
                boxShadow: darkMode
                  ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
                  : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)"
              }}
              onClick={() => generateImage()}>
              <p>Generate Image</p>
            </div>
            <div
              class="btn btn__secondary"
              style={{
                backgroundColor: darkMode ? "#1F1F1F" : "#E0E5EC",
                boxShadow: darkMode
                  ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
                  : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)"
              }}
              onClick={() => generateText("code", 400)}>
              <p>Generate Code</p>
            </div>
          </Stack>
          <Stack sx={{ margin: "10px" }}>
          <div class="input__container" style={{margin:"50px"}}>
  <div class="shadow__input"></div>
  <button class="input__button__shadow" onClick={changeSelection}>
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
      <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fill-rule="evenodd" fill="#17202A"></path>
    </svg>
  </button>
  <input type="text" name="text" class="input__search" id="chsel" placeholder={text}/>
</div>
            <Stack
              direction={"row"}
              sx={{ width: "auto", height: "auto", gap: "20px" }}>
              <Avatar
                src="https://i.ibb.co/xgQW3dp/Beige-Illustrated-Cat-T-Shirt.png"
                sx={{
                  width: "50px",
                  height: "50px",
                  boxShadow: darkMode
                    ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
                    : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)"
                }}
              />

              <div
                className="messageS"
                style={{
                  width: "auto",
                  height: "auto",
                  overflow: "hidden",
                  wordWrap: "break-word",
                  padding: "10px",
                  borderRadius: "0px 15px 15px 15px",
                  fontFamily: "Poppins"
                }}>
                {text}
              </div>
            </Stack>

            {isTextLoading && (
              <Stack direction="row" justifyContent={"flex-end"}>
                <Pencil />
                <Avatar
                  src="https://i.ibb.co/FgHHJZ3/Black-Minimalist-Globe-T-Shirt.png"
                  sx={{
                    width: "50px",
                    height: "50px",
                    boxShadow: darkMode
                      ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
                      : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)"
                  }}
                />
              </Stack>
            )}
            {isImageLoading && (
              <Stack direction="row" justifyContent={"flex-end"}>
                <Lisa />
                <Avatar
                  src="https://i.ibb.co/FgHHJZ3/Black-Minimalist-Globe-T-Shirt.png"
                  sx={{
                    width: "50px",
                    height: "50px",
                    boxShadow: darkMode
                      ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
                      : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)"
                  }}
                />
              </Stack>
            )}

            {dispAns && (
              <Stack
                direction={"column"}
                alignItems={"flex-end"}
                sx={{ margin: "10px" }}>
                <Stack direction={"row"} sx={{ width: "auto", gap: "20px" }}>
                  {!isImage && (
                    <div
                      className="messageR"
                      style={{
                        width: "auto",
                        height: "auto",
                        overflow: "hidden",
                        wordWrap: "break-word",
                        padding: "10px",
                        borderRadius: "15px 0px 15px 15px",
                        fontFamily: "Poppins"
                      }}>
                      {ansText}
                    </div>
                  )}
                  {isImage && (
                    <Stack direction={"row"} gap={"10px"}>
                      <img
                        className="img"
                        src={imageUrl1}
                        height={"200px"}
                        width={"200px"}
                        alt="Generated Image"
                        style={{ borderRadius: "15px" }}
                      />
                      <img
                        className="img"
                        src={imageUrl2}
                        height={"200px"}
                        width={"200px"}
                        alt="Generated Image"
                        style={{ borderRadius: "15px 0 15px 15px" }}
                      />
                    </Stack>
                  )}
                  <Avatar
                    src="https://i.ibb.co/FgHHJZ3/Black-Minimalist-Globe-T-Shirt.png"
                    sx={{
                      width: "50px",
                      height: "50px",
                      boxShadow: darkMode
                        ? "20px 20px 54px #0c0c0c,-20px -20px 54px #323232"
                        : " 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5)"
                    }}
                  />
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </div>
    </div>
  )
}

export default Home
