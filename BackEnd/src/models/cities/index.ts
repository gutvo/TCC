import { DataTypes, type Model } from 'sequelize'
import { sequelize } from '../../migrations/mysql'

export interface CityData extends Model {
  id: string
  name: string
}

export const City = sequelize.define<CityData>(
  'cityData',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    label: {
      type: DataTypes.STRING,
      unique: true
    }
  },
  {
    tableName: 'city',
    timestamps: false
  }
)

// City.sync()
