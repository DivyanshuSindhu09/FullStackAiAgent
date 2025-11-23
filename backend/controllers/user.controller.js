import bcrypt from "bcrypt"
import { User } from "../models/user.model.js"
import { inngest } from "../inngest/client.js"
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

export const login = async (req, res) => {

    const {email, password} = req.body
    try {
        const user = await User.findOne({email})

        if (!user) {
            return res.status(401).json({error : "User not found!"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({error : "Invalid Password"})
        }

        const token = jwt.sign({
            _id : user._id,
            role : user.role
        }, process.env.JWT_SECRET)

        return res.json({
            user, token
        })

    } catch (error) {
        res.status(500).json({error : "SignUp Failed In Controller"})
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(401).json({error : "Unauthorized!"})
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({error : "Unauthorized!"})
            }
        })

        
    } catch (error) {
        
    }
}