import jwt from "jsonwebtoken";
const Jwt_key = "ruchit@12387654";

export function setuser(user) {
  const payload = {
    id: user._id,
    fullname:user.fullname,
    email: user.email,
    profileImageUrl:user.profileImageUrl,
    role:user.role
  }   
  return jwt.sign(payload, Jwt_key);
}
export function getuser(token) {
  return jwt.verify(token, Jwt_key);
}
