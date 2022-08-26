const mongoose = require("mongoose")

const CollegeSchema = new mongoose.Schema({
    college_id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    year_founded:{
        type:Number,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true,
    },
    number_of_students:{
        type:Number,
        required:true
    },
    courses:{
        type:[String],
        required:true,
        enum: ['Computer Science', 'Electrical', 'Electronics', 'Mechanical', 'Civil']
    }

})

const CollegeData = mongoose.model("College_data", CollegeSchema)

module.exports = CollegeData