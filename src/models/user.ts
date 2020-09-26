import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";
import database from "../database/connection";
import Role from "../models/role";

class User extends Model {
  public id!: number;

  public name!: string;

  public active!: boolean;

  public password!: string;

  public passwordHash!: string;

  public email!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}

User.init(
  {
    firstName: Sequelize.STRING,
    password: Sequelize.VIRTUAL,
    passwordHash: Sequelize.STRING,
    email: Sequelize.STRING,
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: database.connection,
  }
);

User.addHook(
  "beforeSave",
  async (user: User): Promise<void> => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 8);
    }
  }
);

User.belongsToMany(Role, { through: "RoleUser" });

export default User;
