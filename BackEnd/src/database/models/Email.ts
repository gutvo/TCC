import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import sequelize from "..";
// import { type ModelsProps } from './type'

class Email extends Model<
  InferAttributes<Email>,
  InferCreationAttributes<Email>
> {
  declare id: CreationOptional<number>;
  declare email: string;

  //   static associate (models: ModelsProps) {
  //     Phone.hasMany(models.UserPhone, { foreignKey: 'phone_id', as: 'user' })
  //   }
}

Email.init(
  {
    id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  { sequelize, tableName: "emails" },
);

export default Email;
