import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../migrations/mysql";

export interface OngData extends Model {
    id:number
    road: string;
    neighborhood: string;
    city: string;
    CEP:string
    userId:number

}

export const Ong = sequelize.define<OngData>('ongData', {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      road:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      neighborhood:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      city:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      CEP:{
        type:DataTypes.STRING,
        allowNull: false,
      },
      userId:{
        type:DataTypes.INTEGER,
        allowNull: false,

      }
},{
    tableName: "ong",
    timestamps: false,
  });
