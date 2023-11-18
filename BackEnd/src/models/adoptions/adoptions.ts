import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../migrations/mysql'

export interface AdoptionData extends Model {
  id: number
  animalId: number
  userId: number
  ongId: number
  confirm: boolean
  userName: string
  userEmail: string
}

export const Adoption = sequelize.define<AdoptionData>(
  'adoptionDta',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    animalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ongId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    confirm: {
      type: DataTypes.BOOLEAN,
    },
    userName: {
      type: DataTypes.STRING,
    },
    userEmail: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'adoption',
    timestamps: false,
  },
)

// sequelize.sync();
