const CollegeData = require("../database/college")
const StudentData = require("../database/student")


async function getAllColleges(req,res){
    const { limit } = req.query

    const collegeData = await CollegeData.find().limit(limit)

    return res.send(collegeData)
}



async function getFilterCollegeData(req,res){
    const { input } = req.query

    const collegeData = await CollegeData.find({ $or:[ {name:{ $regex: input }} , {city:{ $regex: input }} , {state:{ $regex: input }} ] })

    return res.send(collegeData)
}


async function getParCollege(req,res){
    const { id } = req.params

    const collegeData = await CollegeData.find({college_id:id})

    return res.send(collegeData)
}


async function getSimilarCollege(req,res){
    const { id } = req.params

    try {
        let existingCollege = await CollegeData.find({college_id:id})

        if(existingCollege[0] !== undefined){

            let collegeData = await CollegeData.find({$and:[ {state:existingCollege[0].state} , {courses:{$in:existingCollege[0].courses}} , {number_of_students:{ $lte:existingCollege[0].number_of_students+100}} , {number_of_students:{ $gte:existingCollege[0].number_of_students-100}}]})

            return res.send(collegeData)

        }else{
            return res.send("No")
        }
        
    } catch (error) {
        return res.send(error)
    }
    
}

async function getStudentList(req,res){
    const { id } = req.params

    const studentData = await StudentData.find({college_id:id})

    return res.send(studentData)
}


async function getStudentData(req,res){
    const { id } = req.params

    const studentData = await StudentData.find({_id:id})

    return res.send(studentData)
}


module.exports = {
    getAllColleges,
    getFilterCollegeData,
    getParCollege,
    getSimilarCollege,
    getStudentList,
    getStudentData
}