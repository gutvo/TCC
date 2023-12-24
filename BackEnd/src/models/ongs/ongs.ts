import { DataTypes, type Model } from 'sequelize'
import { sequelize } from '../../migrations/mysql'

export type OngData = {
  id: string
  road: string
  neighborhood: string
  city: string
  CEP: string
  cpfCnpj: string
  userId: number
  houseNumber: number
  uf: string
  userData?: {
    name: string
  }
} & Model

export const Ong = sequelize.define<OngData>(
  'ongData',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    road: {
      type: DataTypes.STRING,
      allowNull: false
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CEP: {
      type: DataTypes.STRING(9),
      allowNull: false
    },
    cpfCnpj: {
      type: DataTypes.STRING(18),
      allowNull: false
    },
    houseNumber: {
      type: DataTypes.STRING(6)
    }
  },
  {
    tableName: 'ong',
    timestamps: false
  }
)

// Ong.sync()
