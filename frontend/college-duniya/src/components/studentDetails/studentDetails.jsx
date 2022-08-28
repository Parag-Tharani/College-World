import { Box } from "@mui/material";
import React from "react";
import { API_URL } from "../../App";
import { useParams } from "react-router-dom";


export const StudentDetails = () => {
    const { id } = useParams()
    const [Data, setData] = React.useState([])
    const [skills, setSkills] = React.useState("")



    function HandleData(data){
        setData(data[0])
        setSkills(data[0].skills.join(" , "))
    }

    React.useEffect(() => {

        fetch(`${API_URL}/parStudent/${id}`)
        .then((res) => res.json())
        .then((data) => HandleData(data))
        .catch((err) => console.log(err))

        // eslint-disable-next-line
    },[])

    return (
        <>
        <Box className="collegeDetails" sx={{height:"101vh"}}>
            <Box className="collegeDetailsDiv">
                <h1 style={{fontSize:"35px"}}>College Details: </h1>
                <Box className="collegeDetailDivChild">
                    <h2 style={{fontSize:"40px", marginBottom:"10px"}}>{Data.name}</h2>
                    
                    <Box sx={{textAlign:"left", marginTop:"50px"}}>
                        <li style={{fontSize:"20px", marginBottom:"15px"}}>Batch Year: {Data.year_of_batch}</li>
                        <li style={{fontSize:"20px", marginBottom:"50px", textAlign:"justify"}}><u>Skills:</u> <br/> --> {skills}</li>
                    </Box>
                </Box>
            </Box>
        </Box>
        </>
    )
}