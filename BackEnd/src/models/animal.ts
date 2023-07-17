import { Model, DataTypes } from "sequelize";
import { sequelize } from "../migrations/mysql";

export interface animalData extends Model {
  id: number;
  name: string;
  race: string;
  color: string;
  sex: "Macho" | "Fêmea";
  description: string;
  type: "Cachorro" | "Peixe" | "Gato" | "Outros";
  birthday: number;
  image: boolean;
}

export const Animal = sequelize.define<animalData>(
  "animalData",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    race: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
    sex: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATEONLY,
    },
    image: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "animal",
    timestamps: false,
  }
);

sequelize.sync();
