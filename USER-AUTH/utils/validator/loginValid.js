import joi from "joi";

function loginScehma(data) {
  const schema = joi.object({
    email: joi.string()
    .required()
    .email(),
    password: joi.string()
    .required(),
  });
  return schema.validate(data,{ abortEarly: false });
}

export default loginScehma;
