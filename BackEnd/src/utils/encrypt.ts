import { randomBytes, scryptSync } from "node:crypto";

export default function encrypt(password: string) {
  const salt = randomBytes(16).toString("hex"); // gera um salt aleatório
  const hash = scryptSync(password, salt, 64).toString("hex"); // gera o hash
  return `${salt}:${hash}`; // salva os dois juntos
}
