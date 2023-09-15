import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../migrations/mysql";

export interface PhoneData extends Model {
    id: number
    phone: number
}

export const Phone = sequelize.define<PhoneData>('phoneData', {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      phone:{
        type: DataTypes.STRING,
    }
},{
    tableName: "phone",
    timestamps: false,
  });