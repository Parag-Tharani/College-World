const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    college_id:{
        type:Number
    },
    year_of_batch:{
        type:Number
    },
    skills:{
        type:[String]
    }
})

const StudentData = mongoose.model("Student_data", StudentSchema)

module.exports = StudentData