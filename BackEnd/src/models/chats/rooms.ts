import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../migrations/mysql";

export interface RoomData extends Model {
  id: number
  name:string
  receiver:string
  sender:string
}

export const Room = sequelize.define<RoomData>(
  "roomData",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "room",
    timestamps: false,
  }
);
