import { Animal } from "./animals/animal";
import { Ong } from "./ongs/ongs";
import { User } from "./users/user";

User.hasOne(Ong, { foreignKey: 'userId', as: 'ongData',onDelete:'CASCADE' });
Ong.belongsTo(User,{ onDelete:'CASCADE',foreignKey: 'userId', targetKey:'id',as: 'userData'});

Ong.hasMany(Animal, {  foreignKey: 'ongId', onDelete:'CASCADE',})
Animal.belongsTo(Ong,{  foreignKey: 'ongId'})


//sequelize.sync({force:true});
//sequelize.sync();