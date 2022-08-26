import React from "react";
import "./home.css"
import { Box } from "@mui/material";

export const Home = () => {

    return (
        <>
        <Box className="home" >
            <p className="quote" style={{fontSize:"17vw", marginTop:"15vh"}}>Know Your</p>
            <p className="quote" style={{fontSize:"12vw", marginTop:"55vh", marginLeft:"45vw"}}>Right Path</p>
        </Box>
        </>
    )
}