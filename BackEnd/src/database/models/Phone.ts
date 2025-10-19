import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes
} from 'sequelize'
import { sequelize } from '..'
import { type ModelsProps } from './type'

export class Phone extends Model<
InferAttributes<Phone>,
InferCreationAttributes<Phone>
> {
  declare id: CreationOptional<number>
  declare ddi: string
  declare number: string

  static associate (models: ModelsProps) {
    Phone.hasMany(models.UserPhone, { foreignKey: 'phone_id', as: 'user' })
  }
}

Phone.init(
  {
    id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true
    },
    ddi: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    number: {
      type: DataTypes.STRING(20),
      validate: {
        isNumeric: true
      }
    }

  },
  {
    sequelize,
    tableName: 'phones',
    timestamps: true,
    underscored: true
  }
)
