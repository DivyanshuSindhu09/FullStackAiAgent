import bcrypt from "bcrypt"
import { User } from "../models/user.model"
import { inngest } from "../inngest/client"
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
    try {
        const {email, password, skills = []} = req.body

        const hashedPassword = bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            password : hashedPassword,
            skills
        })

        //fire the inngest event

        await inngest.send({
            name : "user/signup", //jo event fire krna hai uska naam
            data : {
                email, //add required data here
            }
        })

        const token = jwt.sign({
            _id : user._id,
            role : user.role
        }, process.env.JWT_SECRET)

        return res.json({
            user, token
        })
    } catch (error) {
        res.status(500).json({error : "SignUp Failed "})
    }
}