import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../instances/mysql'

export interface Usuario extends Model {
  id: number
  name: string
  email: string
  senha: string
}

export const User = sequelize.define<Usuario>(
  'usuario',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    senha: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  },
)
sequelize.sync()

/*
export const User = {
  getUser: (id: number): Usuario | undefined => {
    return data.find((user) => user.id === id)
  },
}
*/
