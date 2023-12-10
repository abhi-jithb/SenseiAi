import React from 'react'
import './history.css'
import HistoryIcon from "@mui/icons-material/History"
import Stack from '@mui/material/Stack';
const HistoryComp = (props) => {
    const text = props.val
  return (
    <Stack className="history" direction={"row"} width={"900px"} height={"auto"} gap={"20px"}margin={"20px"} padding={"20px"}>
                <HistoryIcon/>
                <p> {text} </p>
    </Stack>
  )
}

export default HistoryComp
