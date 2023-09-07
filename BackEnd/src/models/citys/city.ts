import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../migrations/mysql";

export interface CityData extends Model {
  id: number;
  name: string
}

export const City = sequelize.define<CityData>(
  "cityData",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    label: {
      type: DataTypes.STRING,
      unique: true
    },
  },
  {
    tableName: "city",
    timestamps: false,
  }
);

sequelize.sync();