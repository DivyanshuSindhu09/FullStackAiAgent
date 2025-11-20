import cors from "cors"
import express from "express"
import mongoose from "mongoose"

const app = express();

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

mongoose
    .connect(process.env.MONGODB_URI, PORT)
    .then(() => {
        console.log(`CONNECTED WITH DATABASE`)
        app.listen(PORT, () => {
            console.log(`Server is running at PORT ${PORT}`)
        })
    })
    .catch((err) => console.error("Error while connecting to the database", err))