import encrypt from "@Utils/encrypt";
import User from "../../database/models/User";
import { generateAccessToken } from "../../functions";
import translate from "@Dictionary";
import compareEncrypt from "@Utils/compareEncrypt";

interface LoginServiceProps {
  email: string;
  password: string;
}

export default async function loginService({
  email,
  password,
}: LoginServiceProps) {
  const result = await User.findOne({
    where: { email },
    include: { association: "ongData" },
  });

  if (result === null) {
    return {
      message: translate({ id: "users-email-or-password-not-found" }),
      status: 404,
    };
  }

  const comparation = compareEncrypt(password, result.password);

  if (!comparation) {
    return {
      message: translate({ id: "users-email-or-password-not-found" }),
      status: 404,
    };
  }

  const encryptPassword = encrypt(password);

  const token = generateAccessToken(email, encryptPassword);

  const name = result.name.split(" ")[0];

  return {
    message: translate({ id: "users-login-success", value: name }),
    data: result,
    token,
    status: 200,
  };
}
