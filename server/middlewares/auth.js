import { decode } from "../utils/jwt.js";

export const validateToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;
    
    const token = authorization.split(" ")[1];
    
    const { id } = await decode(token);
    
    const userDetails = await adminModel
    .findById(id)
    
    if (!userDetails) {
      return res.status(404).json({
        message: message.UNAUTHORIZED,
      })
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message:message.UNAUTHORIZED
        
    });
  }
};