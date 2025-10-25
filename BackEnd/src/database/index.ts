import { Sequelize } from "sequelize";

// configuração do banco de dados

const sequelize = new Sequelize( // estanciando o sequelize
  process.env.MYSQL_DB as string, // qual o banco
  process.env.MYSQL_USER as string, // qual usuario
  process.env.MYSQL_PASSWORD as string, // qual a senha do banco
  {
    dialect: "mysql", // fala que o banco é o mysql
    port: parseInt(process.env.MYSQL_PORT as string), // fala qual a porta
    define: {
      timestamps: true, // 🔥 timestamps em todas as tabelas
      freezeTableName: true, // opcional: evita pluralização automática
    },
    logging: false,
  },
);

export default sequelize;
