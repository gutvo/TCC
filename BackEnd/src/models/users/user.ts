import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../migrations/mysql";

import {Ong}from './ongs'
import { Animal } from "../animal";

export interface UserData extends Model {
  id: number;
  name:String
  email: string;
  password: string;
  ongId:number|null
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
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

User.hasOne(Ong, {  foreignKey: 'userId', as: 'ongData', onDelete:'CASCADE' });
Ong.belongsTo(User,{onDelete:'CASCADE'});

Ong.hasMany(Animal, {  foreignKey: 'ongId', as: 'animalData', onDelete:'CASCADE'})
Animal.belongsTo(Ong)


// sequelize.sync({force:true});
//sequelize.sync();