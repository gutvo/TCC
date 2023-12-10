import { DataTypes, type Model } from 'sequelize'
import { sequelize } from '../../migrations/mysql'

export interface MessageData extends Model {
  id: string
  email: string
  message: string
  room: string
}

export const Message = sequelize.define<MessageData>(
  'messageData',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'message',
    timestamps: false
  }
)

// Message.sync()
