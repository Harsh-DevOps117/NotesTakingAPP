import bcrypt from "bcrypt"
import User from "../models/User.model.js"
import logger from "../utils/logger/logger.js"
import RegisterationScehma from "../utils/validator/registerationVALID.js"

const UserRegister=async(req,res,next)=>{
  const DataValidation=RegisterationScehma(req.body)
  if(!DataValidation){
    logger.error("Invalid Data")
    return res.status(400).json({
      success:false,
      message:"Invalid Data"
    })
  }else{
    try {
      const {name,email,password}=req.body
      const newPassword=password+process.env.SALT
      const UserExist=await User.findOne({email})
      if(UserExist){
        logger.error("User already exists")
        return res.status(400).json({
          success:false,
          message:"User already exists"
        })
      }
      const HashedPasswored=await bcrypt.hash(newPassword,10)
      const newUser=new User({
        name:name,
        email:email,
        password:HashedPasswored
      })
      console.log(newUser)
      newUser.save()
      logger.info("User registered successfully")
      return res.status(200).json({
        success:true,
        message:"User registered successfully"
      })
    }
    catch (error) {
      logger.error(error)
      return res.status(500).json({
        success:false,
        message:"Something went wrong"
      })
    }
  }
}

export default UserRegister
