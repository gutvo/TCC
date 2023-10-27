import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../migrations/mysql";
import { Ong } from "../ongs/ongs";
import { Animal } from "../animals/animal";
import { Phone } from "../ongs/phones";
import { Adoption } from "../adoptions/adoptions";

export interface UserData extends Model {
  id: number;
  name:String
  email: string;
  password: string;
  ongId:number|null
  image:string
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
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

User.hasOne(Ong, { foreignKey: 'userId', as: 'ongData',onDelete:'CASCADE' });
Ong.belongsTo(User,{ onDelete:'CASCADE',foreignKey: 'userId', targetKey:'id',as: 'userData'});

Ong.hasMany(Animal, {  foreignKey: 'ongId', onDelete:'CASCADE',})
Animal.belongsTo(Ong,{  foreignKey: 'ongId', as: 'ongData'})

Ong.hasMany(Phone, {  foreignKey: 'ongId', onDelete:'CASCADE',as:'phoneData'})
Phone.belongsTo(Ong,{  foreignKey: 'ongId', as: 'ongData'})

Adoption.belongsTo(Animal,{ foreignKey:'animalId',as:'animalData'})
Adoption.belongsTo(User,{ foreignKey:'userId',as:'userData'})
Adoption.belongsTo(Ong,{ foreignKey:'ongId',as:'ongData'})


//sequelize.sync({force:true});
//sequelize.sync();