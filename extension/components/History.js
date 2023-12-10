import { Home } from "@mui/icons-material"
import EditIcon from "@mui/icons-material/Edit"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"
import { Stack } from "@mui/material"
import React, { useEffect } from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import HistoryComp from "./HistoryComp"
import React, { useEffect, useState } from "react";

import "./history.css"

const History = () => {
  const [config, setConfig] = useState({
    token: window.localStorage.getItem("token")
  })
  const [historyData, setHistoryData] = useState({
    message:{}
  });

  useEffect(() => {
    const fetchHistoryData = async () => {
      
      console.log(config);
      try {
        const response = await axios.post("http://localhost:8000/getHistory", config);
        console.log(response);
        setHistoryData(response.data.message);
        console.log(historyData);
      } catch (error) {
        console.log(error);
      }
    };
    setConfig({
      token: window.localStorage.getItem("token")
    })
    fetchHistoryData();

  }, []);
  
  return (
    <div
      style={{
        backgroundColor: "#E0E5EC",
        width: "1000px",
        height: "auto",
        padding: "20px"
      }}>
      <div className="boxH">
        <Stack>
          <Stack direction={"column"} alignItems={"flex-end"} padding={"20px"}>
            <Stack direction={"row"} sx={{ padding: "20px", gap: "10px" }}>
              <Link to="/land">
                <button class="neumorphic-button">
                  <span class="icon">
                    <PowerSettingsNewIcon />
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
              <Link to="/settings">
                <button class="neumorphic-button">
                  <span class="icon">
                    <EditIcon />
                  </span>
                </button>
              </Link>
            </Stack>
          </Stack>
          {Array.isArray(historyData) ? (
  historyData.map((item) => (
    <HistoryComp val={item.history} key={item.id} />
  ))
) : (
  <p></p>
)}


        </Stack>
      </div>
    </div>
  )
}

export default History
