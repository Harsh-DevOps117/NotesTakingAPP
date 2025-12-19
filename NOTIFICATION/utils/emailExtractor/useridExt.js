import jwt from "jsonwebtoken";

const emailIDExtractor = (req) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken.userEmail;
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
};

export default emailIDExtractor;
