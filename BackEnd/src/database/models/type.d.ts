import { type Phone } from "./Phone";
import { type User } from "./User";
import { type UserPhone } from "./UserPhone";

export interface ModelsProps {
  User: typeof User;
  Phone: typeof Phone;
  UserPhone: typeof UserPhone;
}
