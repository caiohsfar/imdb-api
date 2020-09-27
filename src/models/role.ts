import Sequelize, { Model } from "sequelize";
import database from "../database/connection";

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
    sequelize: database,
  }
);

export default Role;
