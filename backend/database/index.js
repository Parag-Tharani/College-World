const mongoose = require("mongoose")
require('dotenv').config();

async function connectDatabase(){
    // "mongodb://localhost:27017/CollegeWorld"
    
    try {
        const db_Url = process.env.db_Url
        await mongoose.connect(db_Url)
        console.log("Database Connection Successful.")
    } catch (error) {
        throw error
    }
}

module.exports = {connectDatabase}