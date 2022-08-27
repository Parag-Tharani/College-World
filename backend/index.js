const express = require("express")
const cors = require("cors")
const {connectDatabase} = require("./database")
const DataRoutes = require("./routes/data")
require('dotenv').config();

const port = process.env.PORT 

const app = express()


app.use(express.json())
app.use(cors())

app.get(('/'), (req,res) => {
    res.send("Welcome Guests")
})

app.use(DataRoutes)


connectDatabase()
.then(() => {
    app.listen(port, () => {
        console.log(`${port} || Database initialized at http://localhost:${port}`)
    })
})
.catch((err) => console.log("Error Connecting Database"))