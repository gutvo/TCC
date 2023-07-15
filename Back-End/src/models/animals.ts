import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../instances/mysql'
export interface Pet extends Model {
  id: number
  name:string,
  race:string,
  color:string,
  sex: 'Macho' | 'Fêmea',
  description:string,
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'outros',
  birthday:number,
  image:boolean,
}
export const Pets = sequelize.define<Pet>(
  'pets',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name:{
      type: DataTypes.STRING
    },
    race:{
      type: DataTypes.STRING
    },
    color:{
      type: DataTypes.STRING
    },
    sex:{
      type: DataTypes.STRING
    },
    description:{
      type: DataTypes.STRING
    },
    type:{
      type: DataTypes.STRING
    },
    birthday:{
      type: DataTypes.INTEGER
    },
    image:{
      type: DataTypes.BOOLEAN
    }

  },
  {
    tableName: 'pet',
    timestamps: false,
  },
)

export const findAllPets = async (
  pagina: number,
  limite: number,
  filtro: string,
): Promise<{ rows: Pet[]; count: number }> => {
  const offset = (pagina - 1) * limite
  const results = await Pets.findAndCountAll({
    limit: limite,
    where: filtro ? { name: filtro } : undefined,
    offset,
  })
  return {
    rows: results.rows as Pet[],
    count: results.count,
  }
}

// sequelize.sync()
