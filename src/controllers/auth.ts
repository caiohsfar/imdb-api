import { Request, Response } from "express";
import log4js from "log4js";
import logger from "../../src/utils/logger";
import Role from "../models/role";
import RoleUser from "../models/role_user";
import User from "../models/user";
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
require("dotenv").config();
import database from "../database/connection";

export default class AuthController {
  private logger: log4js.Logger;

  constructor() {
    this.logger = logger.getLogger();
  }

  public async singUp(req: Request, res: Response) {
    const { email, name, roles, password } = req.body;
    const trx = await database.transaction();

    try {
      const user = await User.findOne({
        where: { email: req.body?.email, active: true },
      });
      if (user) {
        return res
          .status(400)
          .send({ message: "Failed! Email is already in use!" });
      }

      const newUser = await User.create(
        { name, email, password },
        { transaction: trx }
      );

      for (const role in roles) {
        const returnedRole = await Role.findOne({
          where: { name: roles[role] },
        });

        await RoleUser.create(
          {
            userId: newUser.id,
            roleId: returnedRole?.id,
          },
          { transaction: trx }
        );
      }

      trx.commit();

      return res.status(201).send({ message: "User created successfully" });
    } catch (err) {
      console.error(err);
      trx.rollback();
      return res.status(500).send({ message: "Something went wrong!" });
    }
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email, active: true },
      include: [
        {
          model: Role,
          as: "roles",
          attributes: ["name"],
        },
      ],
    });

    if (!user) {
      return res.status(400).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(password, user.passwordHash);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    var authorities = user.roles.map((role: { name: string }) =>
      role.name.toUpperCase()
    );

    // for (let i = 0; i < user.roles.length; i++) {
    //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    // }
    res.status(200).send({
      id: user.id,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  }
}
