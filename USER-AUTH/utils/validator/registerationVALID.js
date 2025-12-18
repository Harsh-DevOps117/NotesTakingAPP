import joi from "joi"


const RegisterationScehma=(data)=>{
  const schema=joi.object({
    name:joi.string()
    .required()
    .max(30),

    email:joi.string()
    .required()
    .email(),

    password:joi.string()
    .required()
  })
  return schema.validate(data,{abortEarly:false})
}

export default RegisterationScehma
