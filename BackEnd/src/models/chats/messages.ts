import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../migrations/mysql";

export interface MessageData extends Model {
  id: number;
  email:string
  message:string
  room:string
}

export const Message = sequelize.define<MessageData>(
  "messageData",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "message",
    timestamps: false,
  }
);
