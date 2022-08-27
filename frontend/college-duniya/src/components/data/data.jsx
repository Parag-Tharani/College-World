import { Box} from "@mui/material";
import React from "react";
import "./data.css"
import { BiSearch } from "react-icons/bi"
import { API_URL } from "../../App";
import { Pie } from '@ant-design/plots';
import { useNavigate } from "react-router-dom";

export const Data = () => {

    const navigate = useNavigate()
    const [input , setInput] = React.useState("")
    const [Data , setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [noData, setNoData] = React.useState(false)
    const [data] = React.useState([])


    function HandleData(state){

        let boolean = false

        data.forEach((items) => {
            if(items.type === state){
                items.value = items.value+1
                boolean = true
            }
        })

        if(data === [] || boolean === false){
            const body = {
                "type" : state,
                "value" : 1
            }
            data.push(body)
        }

        
    }
    // console.log(data)

async function AllCollege(){
    setData([])
    setNoData(false)
    fetch(`${API_URL}/allCollege`)
    .then((res) => res.json())
    .then((data) => data.forEach((items) => {
        HandleData(items.state)
        setData((e) => [...e, items])
        setLoading(false)
    }))
    .catch((err) => console.log(err))
}

async function FilterCollege(){
        setData([])
        await fetch(`${API_URL}/filterCollege?input=${input}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.length === 0){
                setNoData(true)
                setLoading(false)
            }else{
                data.forEach((items) => {
                    setLoading(false)
                    setNoData(false)
                    setData((e) => [...e, items])
                })
            }
        })
        .catch((err) => console.log(err))
}



    React.useEffect(() => {

        setLoading(true)
        // eslint-disable-next-line
        {
            input !== ""?
            FilterCollege():
            AllCollege()
        }
        // eslint-disable-next-line
    },[input])




        const config = {
          appendPadding: 10,
          data,
          angleField: 'value',
          colorField: 'type',
          autofit:'height',
          radius: 0.8,
          innerRadius: 0.6,
          label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
              textAlign: 'center',
              fontSize: 14,
            },
          },

          interactions: [
            {
              type: 'element-selected',
            },
            {
              type: 'element-active',
            },
          ],
          statistic: {
            title: false,
            content: {
              style: {
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
              content: 'College\nStates',
            },
          },
        };
    

    return (
        <>
        
        <Box className="searchDataDiv">

            <Box className="collegeListheading" id="collegeHeading">
                <h1>College List</h1>
            </Box>

            <Box>

                <Box className="search flexDiv" id="searchInput">
                    <BiSearch style={{color:"white", fontSize:"30px", marginLeft:"10px"}} />
                    <input className="inputSearch" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search for your college name / college city / college state... "></input>
                    <button className="clearButton" onClick={() => setInput("")}>Clear</button>
                </Box>

                {
                loading?

                <Box className="searchDataDiv" sx={{backgroundColor:"rgb(13, 13, 13)"}}>
                    <img alt="Loading..." src="https://wtfup.me/assets/loader.gif" style={{width:"150px", height:"150px", marginTop:"100px"}} />
                </Box>

                :
                <Box className="flexDiv" sx={{alignItems:"start"}} id="searchResult">
                    {
                        noData ?
                        <Box className="noDataFound"> <h1>No Data Found ...</h1> </Box>
                        :
                    <Box className="searchResult">
                        {
                            Data.map((items, index) => {
                                return (
                                    <Box key={index} className="dataBox" sx={{marginBottom:"20px", textAlign:'left'}}>
                                        <Box sx={{width:"50%"}}>
                                        <h1 className="CollegeHeading">{items.name}</h1>
                                        <p>{items.city} , {items.state}, {items.country}</p>
                                        </Box>
                                        <button className="loginButton" onClick={() => navigate(`/collegeDetails/${items.college_id}`)} style={{cursor:"pointer", width:"150px", height:"50px",fontSize:'17px', color:"white"}}>More Details</button>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    }
                </Box>
                }
            </Box>
        </Box>

        <Box className="VisualData" id="VisualData">
                <Box className="collegeListheading">
                    <h1>Visual Representation</h1>
                </Box>
                <Pie {...config} />
        </Box>
        </>
    )
}