import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../migrations/mysql";

export interface AdoptionData extends Model {
  id: number;
  animalId: number
  userId:number
  ongId:number
}

export const Adoption = sequelize.define<AdoptionData>(
  "adoptionDta",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    animalId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    ongId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
  },
  {
    tableName: "adoption",
    timestamps: false,
  }
);

// sequelize.sync();