import { sequelize } from "migrations/mysql";
import { Animal } from "./animal";
import { Ong } from "./users/ongs";
import { User } from "./users/user";



User.hasOne(Ong, { constraints: true, foreignKey: 'userId', as: 'ongData' });
Ong.hasOne(User, { constraints: true, foreignKey: 'ongId' });
Ong.hasMany(Animal, { constraints: true, foreignKey: 'ongId', as: 'animalData' })
Animal.hasOne(Ong)

sequelize.sync({force:true});
// sequelize.sync();