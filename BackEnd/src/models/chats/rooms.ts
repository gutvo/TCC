import { DataTypes, type Model } from 'sequelize'
import { sequelize } from '../../migrations/mysql'

export interface RoomData extends Model {
  id: string
  name: string
  receiver: string
  sender: string
}

export const Room = sequelize.define<RoomData>(
  'roomData',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'room',
    timestamps: false
  }
)

// Room.sync()
