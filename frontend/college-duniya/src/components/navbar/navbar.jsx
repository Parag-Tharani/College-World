import React from "react";
import "./navbar.css"
import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom";


export const Navbar = () => {

    const navigate = useNavigate()
    const [background , setBack] = React.useState(null)

    const changeBackground = () => {
        
        if (window.scrollY >= 66) {
          setBack("blackBack")
        } else {
          setBack(null)
        }
    }

    React.useEffect(() => {
        window.addEventListener("scroll", changeBackground)
    })

    return (
        <>
        <Box className={`flexDiv parentNav ${background} `} >
            <Box className="logo">CW</Box>

            <Box className="flexDiv">
                
                <Box className="flexDiv childNav">
                <Box><a className="navLink" onClick={() => navigate('/')} href="#collegeHeading">Search</a> </Box>
                <Box><a className="navLink" onClick={() => navigate('/')} href="#searchInput">College List </a></Box>
                <Box><a className="navLink" onClick={() => navigate('/')} href="#VisualData">Visual Analysis</a></Box>
                </Box>

                <button className="loginButton navLink">Login</button>
            </Box>
        </Box>
        </>
    )
}