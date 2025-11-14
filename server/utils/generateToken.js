import jwt from "jsonwebtoken";

/**
 * @desc   Generate JWT token for authentication
 * @param  {String} id - MongoDB user ID
 * @returns {String} JSON Web Token
 */
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("❌ JWT_SECRET is missing in environment variables");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token validity: 30 days
  });
};

export default generateToken;
