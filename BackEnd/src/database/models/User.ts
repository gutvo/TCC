import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import sequelize from "..";
import { type ModelsProps } from "./type";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare is_verified: boolean;
  declare file_id: CreationOptional<number>;

  static associate(models: ModelsProps) {
    User.hasMany(models.UserPhone, { foreignKey: "user_id", as: "user" });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
    },

    // TODO:Adicionar references
    file_id: {
      type: DataTypes.INTEGER(),
    },
  },
  { sequelize, tableName: "users" },
);

export default User;
