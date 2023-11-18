import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../migrations/mysql'

export interface OngData extends Model {
  id: number
  road: string
  neighborhood: string
  city: string
  CEP: string
  cpfCnpj: string
  userId: number
  userData?: {
    name: string
  }
}

export const Ong = sequelize.define<OngData>(
  'ongData',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    road: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CEP: {
      type: DataTypes.STRING(9),
      allowNull: false,
    },
    cpfCnpj: {
      type: DataTypes.STRING(18),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'ong',
    timestamps: false,
  },
)
