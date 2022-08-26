const mongoose = require("mongoose")


async function connectDatabase(){
    const db_Url = "mongodb://localhost:27017/CollegeWorld"

    try {
        await mongoose.connect(db_Url)
        console.log("Database Connection Successful.")
    } catch (error) {
        throw error
    }
}

module.exports = connectDatabase