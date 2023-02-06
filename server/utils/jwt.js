import jwt from "jsonwebtoken";

export const encode = async (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const decode = async (token) => {
  return jwt.decode(token, process.env.JWT_SECRET);
};