import Sequelize, { Model } from "sequelize";
import database from "../database/connection";
import User from "../models/user";
import Role from "./role";

class RoleUser extends Model {
  public userId!: number;
  public roleId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RoleUser.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },

    role_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    sequelize: database.connection,
  }
);

export default RoleUser;
