import { DataTypes, type Model } from 'sequelize'
import { sequelize } from '../../migrations/mysql'

export type PhoneData = {
  id: string
  phone: number
} & Model

export const Phone = sequelize.define<PhoneData>(
  'phoneData',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20)
    }
  },
  {
    tableName: 'phone',
    timestamps: false
  }
)

// Phone.sync()
