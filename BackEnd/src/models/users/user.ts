import { DataTypes, type Model } from 'sequelize'
import { sequelize } from '../../migrations/mysql'
import { Ong } from '../ongs/ongs'
import { Animal } from '../animals/animal'
import { Phone } from '../ongs/phones'
import { Adoption } from '../adoptions/adoptions'
import { Room } from '../chats/rooms'
import { Message } from '../chats/messages'

export type UserData = {
  id: number
  name: string
  email: string
  password: string
  ongId: number | null
  image: string | null
} & Model

export const User = sequelize.define<UserData>(
  'userData',
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
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'user'
  }
)

User.hasOne(Ong, { foreignKey: 'userId', as: 'ongData', onDelete: 'CASCADE' })
Ong.belongsTo(User, {
  onDelete: 'CASCADE',
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'userData'
})

Ong.hasMany(Animal, { foreignKey: 'ongId', onDelete: 'CASCADE' })
Animal.belongsTo(Ong, { foreignKey: 'ongId', as: 'ongData' })

User.hasMany(Phone, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  as: 'phoneData'
})
Phone.belongsTo(User, { foreignKey: 'userId', as: 'userData' })

Adoption.belongsTo(Animal, {
  foreignKey: 'animalId',
  as: 'animalData',
  onDelete: 'CASCADE'
})
Adoption.belongsTo(User, { foreignKey: 'userId', as: 'userData' })
Adoption.belongsTo(Ong, {
  foreignKey: 'ongId',
  as: 'ongData',
  onDelete: 'CASCADE'
})

User.hasMany(Room, { foreignKey: 'receiver', as: 'roomOngData' })
Room.belongsTo(User, { foreignKey: 'receiver', as: 'ongData' })

User.hasMany(Room, { foreignKey: 'sender', as: 'roomUserData' })
Room.belongsTo(User, { foreignKey: 'sender', as: 'userData' })

Room.hasMany(Message, {
  foreignKey: 'roomId',
  as: 'messageData',
  onDelete: 'CASCADE'
})
Message.belongsTo(Room, {
  foreignKey: 'roomId',
  as: 'roomData',
  targetKey: 'id'
})

// User.sync()
// sequelize.sync({ force: true })
// sequelize.sync()
