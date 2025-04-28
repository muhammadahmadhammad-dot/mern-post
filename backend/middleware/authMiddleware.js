import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"
const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(401)
        .send({ success: false, message: "Not Authenticated" });
    }
    const token = authorization.split(" ")[1]; // extract token
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
     
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid Token" });
      }
      const user = await userModel.findOne({ _id: decoded.id });
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: "User Not Found" });
      }
      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
      next();
    });
  } catch (error) {
    console.log("Auth middleware error : " + error);
    return res
      .status(400)
      .send({ success: false, message: `Error : ${error}` });
  }
};
export default authMiddleware;
