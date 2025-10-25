import sequelize from "@Database";

export default async function syncDatabase({
  force = false,
  alter = true,
} = {}) {
  await sequelize.sync({ force, alter });
}
