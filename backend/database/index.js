const mongoose = require("mongoose")


async function connectDatabase(){
    const db_Url = "mongodb+srv://ParagTharani:2324password2324@cluster0.lbvtsq5.mongodb.net/CollegeWorld"
    // "mongodb://localhost:27017/CollegeWorld"

    try {
        await mongoose.connect(db_Url)
        console.log("Database Connection Successful.")
    } catch (error) {
        throw error
    }
}

module.exports = connectDatabase