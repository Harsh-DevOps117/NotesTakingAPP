import bcrypt from "bcrypt"
import User from "../models/User.model.js"
import generateTokens from "../utils/generateToken/generateToken.js"
import logger from "../utils/logger/logger.js"
import loginScehma from "../utils/validator/loginValid.js"

const LoginUser= async(req,res,next)=>{
  const DataValidation=loginScehma(req.body)
  if(!DataValidation){
    logger.error("Invalid Data")
    return res.status(400).json({
      success:false,
      message:"Invalid Data"
    })
  }else{
    try {
      const {email,password}=req.body
      const newPassword=password+process.env.SALT
      const UserExist=await User.findOne({email})
      if(!UserExist){
        logger.error("User does not exist")
        return res.status(400).json({
          success:false,
          message:"User does not exist"
        })
      }
      const isPasswordMatch=await bcrypt.compare(newPassword,UserExist.password)
      if(!isPasswordMatch){
        logger.error("Invalid Password")
        return res.status(400).json({
          success:false,
          message:"Invalid Password"
        })
      }
      const {accessToken,refreshToken}=await generateTokens(UserExist)
      res.setHeader("Authorization", `Bearer ${accessToken}`)
      res.cookie("accessToken",accessToken,{httpOnly:true,maxAge:60*60*1000})
      res.cookie("refreshToken",refreshToken,{httpOnly:true,maxAge:7*24*60*60*1000})
      logger.info("User logged in successfully")
      return res.status(200).json({
        success:true,
        message:"User logged in successfully",
        Accesstoken:accessToken,
        Refreshtoken:refreshToken
      })
    }catch (error) {
      logger.error(error)
      console.log(error)
    }
  }
}

export default LoginUser
