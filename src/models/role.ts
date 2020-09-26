import Sequelize, { Model } from "sequelize";
import database from "../database/connection";
import User from "../models/user";

class Role extends Model {
  public id!: number;

  public name!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Role.init(
  {
    name: Sequelize.STRING,
  },
  {
    sequelize: database.connection,
  }
);

Role.belongsToMany(User, { through: "RoleUser" });

export default Role;
