import { Box } from "@mui/material";
import React from "react";
import { API_URL } from "../../App";
import "./collegeDetails.css"
import { useNavigate, useParams } from "react-router-dom";


export const CollegeDetails = (req) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [Data, setData] = React.useState([])
    const [course, setCourse] = React.useState("")

    const [student, setStudentData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [noData, setNoData] = React.useState(false)

    const [similarCollege, setSimilarCollege] = React.useState([])


    function HandleData(data){
        setData(data[0])
        setCourse(data[0].courses.join(" , "))
    }

    React.useEffect(() => {

        fetch(`${API_URL}/parCollege/${id}`)
        .then((res) => res.json())
        .then((data) => HandleData(data))
        .catch((err) => console.log(err))

        // eslint-disable-next-line
    },[id])

    async function AllStudent(){
        setStudentData([])
        setNoData(false)
        fetch(`${API_URL}/studentList/${id}`)
        .then((res) => res.json())
        .then((data) => data.forEach((items) => {
            setStudentData((e) => [...e, items])
            setLoading(false)
        }))
        .catch((err) => console.log(err))
    }

    async function getSimilarCollege(){
        setSimilarCollege([])
        setNoData(false)
        fetch(`${API_URL}/getSimilarCollege/${id}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.length === 0){
                setNoData(true)
                setLoading(false)
            }else{
                data.forEach((items) => {
                    setLoading(false)
                    setNoData(false)
                    setSimilarCollege((e) => [...e, items])
                })
            }
        })
        .catch((err) => console.log(err))
    }
    console.log(similarCollege)


    React.useEffect(() => {

        setLoading(true)
        AllStudent()
        getSimilarCollege()
        // eslint-disable-next-line
    },[id])

    return (
        <>
        <Box className="collegeDetails">
            <Box className="collegeDetailsDiv">
                <h1 style={{fontSize:"35px"}}>College Details: </h1>
                <Box className="collegeDetailDivChild">
                    <h2 style={{fontSize:"40px", marginBottom:"10px"}}>{Data.name}</h2>
                    <p>{Data.city} , {Data.state} , {Data.country}</p>
                    
                    <Box sx={{textAlign:"left", marginTop:"50px"}}>
                        <li style={{fontSize:"20px", marginBottom:"15px"}}>Year Founded: {Data.year_founded}</li>
                        <li style={{fontSize:"20px", marginBottom:"15px"}}>Current Number of Students: {Data.number_of_students}</li>
                        <li style={{fontSize:"20px", marginBottom:"50px", textAlign:"justify"}}><u>Courses Offered:</u> <br/> --> {course}</li>
                    </Box>
                </Box>
            </Box>
        </Box>



        <Box className="searchDataDiv" sx={{height:"auto", paddingBottom:"50px"}}>

            <Box className="collegeListheading">
                <h1>Similar College</h1>
            </Box>

            {
            noData ?
                <Box className="noDataFound"> <h1>No Data Found ...</h1> </Box>
            :
                <Box className="similarCollege">
                        {
                            similarCollege.map((items, index) => {
                                return (
                                    <Box key={index} className="similarCollegeBox">
                                        <h1 className="CollegeHeading">{items.name}</h1>
                                        <p>{items.city} , {items.state}, {items.country}</p>
                                        <button className="loginButton" onClick={() => navigate(`/collegeDetails/${items.college_id}`)} style={{cursor:"pointer", width:"150px", height:"50px",fontSize:'17px', color:"white", marginTop:"10px"}}>More Details</button>
                                    </Box>
                                )
                            })
                        }
                </Box>
            }
        </Box>




        <Box className="searchDataDiv">

            <Box className="collegeListheading">
                <h1>Student List</h1>
            </Box>

            {
                loading?

                <Box className="searchDataDiv" sx={{backgroundColor:"rgb(13, 13, 13)"}}>
                    <img alt="Loading..." src="https://wtfup.me/assets/loader.gif" style={{width:"150px", height:"150px", marginTop:"100px"}} />
                </Box>

                :
                <Box className="flexDiv" sx={{alignItems:"start"}}>
                    {
                        noData ?
                        <Box className="noDataFound"> <h1>No Data Found ...</h1> </Box>
                        :
                    <Box className="searchResult">
                        {
                            student.map((items, index) => {
                                return (
                                    <Box key={index} className="dataBox" sx={{marginBottom:"20px", textAlign:'left'}}>
                                        <Box sx={{width:"50%"}}>
                                        <h1 className="CollegeHeading">{items.name}</h1>
                                        </Box>
                                        <button className="loginButton" onClick={() => navigate(`/studentDetails/${items._id}`)} style={{cursor:"pointer", width:"150px", height:"50px",fontSize:'17px', color:"white"}}>More Details</button>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    }
                </Box>
            }
        </Box>
        </>
    )
}