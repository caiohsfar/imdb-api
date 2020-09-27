import { Request, Response, NextFunction } from "express";
import ROLES from "../constants/roles";
import User from "../models/user";
import database from "../database/connection";
import Role from "../models/role";
import RoleUser from "../models/role_user";
require("dotenv").config();
var jwt = require("jsonwebtoken");

export default class AuthMiddleware {
  constructor() {}

  public static checkRolesExists(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (req.body.roles) {
      req.body.roles.forEach((role: string) => {
        if (!ROLES.includes(role)) {
          return res.status(400).send({
            message: `Failed! Role ${role} does not exist!`,
          });
        }
      });
    } else {
      return res.status(400).send({
        message: `You have to specify the user roles!`,
      });
    }

    next();
  }

  public static async checkDuplicateEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await User.findOne({ where: { email: req.body?.email } });
      if (user) {
        return res
          .status(400)
          .send({ message: "Failed! Email is already in use!" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Something went wrong!" });
    }

    next();
  }

  public static async isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const user = User.findOne({
        where: { id: userId },
        include: [{ model: Role, attributes: ["name"] }],
      });

      if (!user) {
        return res.status(400).send({ message: "User not found!" });
      }

      const filtered = user.roles.filter((role: any) => role.name == "admin");
      if (filtered.length === 0) {
        return res.send(400).send({ message: "This user is not an admin" });
      }

      next();
    } catch (err) {
      res.send(500).send({ message: "Something went wrong!" });
      console.error(err);
    }
  }

  public static verifyToken(req: Request, res: Response, next: NextFunction) {
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(
      token,
      process.env.SECRET,
      (err: any, decoded: { id: string }) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorized!" });
        }
        req.params.userId = decoded.id;
        next();
      }
    );
  }
}
