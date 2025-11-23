import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"

dotenv.config()
const app = express();

const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(cors())
app.use("/api/user", userRoutes);


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(`CONNECTED WITH DATABASE`)
        app.listen(PORT, () => {
            console.log(`Server is running at PORT ${PORT}`)
        })
    })
    .catch((err) => console.error("Error while connecting to the database", err))