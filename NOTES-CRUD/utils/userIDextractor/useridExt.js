import jwt from "jsonwebtoken";


const userIDExtractor = (req) => {
 const token = req.headers.authorization;
 console.log(token)
 if(token){
  const decodedToken = jwt.verify(token, process.env. JWT_SECRET);
  console.log(decodedToken)
   return decodedToken.userId
  }
}

export default userIDExtractor;
