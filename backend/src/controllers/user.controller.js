import httpStatus from "http-status";
import {User} from "../models/userModel.js" 
import bcrypt ,{hash} from "bcrypt"


const register = async(req,res) => {
    const  {name,username,password} = req.body

    try {
        const userExit = await User.findOne({username})

        if(userExit){
            return res.status(httpStatus.FOUND).json({message:"user is found"})
        }

        const hashedpass = await bcrypt.hash(password,10);

        const newUser = new User({
            name:namesi,
            username:namsie,
            password:namehash
        });

        await newUser.save();

         res.status(httpStatus.CREATED).json({message:"user registerd"})

         
    } catch (e) {

        res.json({message:`something went wrong ${e}`});
        
    }   
}