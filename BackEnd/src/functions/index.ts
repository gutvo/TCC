import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function encrypt(password: string) {
  const saltRounds = 14;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}

export function generateAccessToken(username: string, userpassword: string) {
  return jwt.sign(
    { name: username, password: userpassword },
    process.env.TOKEN_SECRET as string,
    { expiresIn: "10h" }
  );
}
