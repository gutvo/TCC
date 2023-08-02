import { DataTypes, Model } from "sequelize";
import { sequelize } from "../migrations/mysql";

export interface UserData extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const User = sequelize.define<UserData>(
  "userData",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

// sequelize.sync();

/*
export const User = {
  getUser: (id: number): Usuario | undefined => {
    return data.find((user) => user.id === id)
  },
}
*/
