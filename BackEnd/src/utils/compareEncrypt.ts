import { scryptSync, timingSafeEqual } from "node:crypto";

export default function compareEncrypt(password: string, storedValue: string) {
  const [salt, storedHash] = storedValue.split(":");
  const hash = scryptSync(password, salt, 64).toString("hex");

  const hashBuf = Uint8Array.from(Buffer.from(hash, "hex"));
  const storedBuf = Uint8Array.from(Buffer.from(storedHash, "hex"));

  return timingSafeEqual(hashBuf, storedBuf);
}
