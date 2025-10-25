import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import sequelize from "..";
import { type ModelsProps } from "./type";

export class UserPhone extends Model<
  InferAttributes<UserPhone>,
  InferCreationAttributes<UserPhone>
> {
  declare user_id: string;
  declare phone_id: string;

  static associate(models: ModelsProps) {
    UserPhone.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    UserPhone.belongsTo(models.Phone, { foreignKey: "phone_id", as: "phone" });
  }
}

UserPhone.init(
  {
    user_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    phone_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      references: {
        model: "phones",
        key: "id",
      },
    },
  },
  { sequelize, tableName: "users_phones" },
);
