import { DataTypes, type Model } from 'sequelize'
import { sequelize } from '../../migrations/mysql'

export interface AdoptionData extends Model {
  id: string
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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    confirm: {
      type: DataTypes.BOOLEAN
    },
    userName: {
      type: DataTypes.STRING
    },
    userEmail: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'adoption',
    timestamps: false
  }
)

// Adoption.sync();
