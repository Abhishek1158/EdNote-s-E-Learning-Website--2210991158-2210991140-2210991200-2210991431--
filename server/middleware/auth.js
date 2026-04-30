const jwt = require("jsonwebtoken");
const auth=(req,res,next) => {
  try{
    // to get token from the authorization header
    const AuthHeader = req.headers["authorization"]; 
    // 1 index number which is actual token
    const token = AuthHeader && AuthHeader.split(" ")[1]; 
    if(!token) return res.status(401).json({ message: "No token provided" });
    // to verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // decoding for matching login
    req.user = { id: decoded.id };

    next(); // moving to route
  } 
  catch(err){
    console.error(err);
    return res.status(401).json({ message:"Please provide valid token..."});
  }
};
module.exports = auth;