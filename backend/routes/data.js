const express = require("express")
const { getAllColleges, getFilterCollegeData, getParCollege, getStudentList, getStudentData, getSimilarCollege } = require("../handlers/data")

const DataRoutes = express.Router()


DataRoutes.get("/allCollege", getAllColleges)
DataRoutes.get('/filterCollege', getFilterCollegeData)
DataRoutes.get("/parCollege/:id", getParCollege)
DataRoutes.get("/getSimilarCollege/:id",getSimilarCollege)
DataRoutes.get("/studentList/:id", getStudentList)
DataRoutes.get("/parStudent/:id", getStudentData)

module.exports = DataRoutes