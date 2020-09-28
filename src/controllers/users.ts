import { Request, Response } from "express";
import log4js from "log4js";
import logger from "../../src/utils/logger";
import User from "../models/user";

export default class UserController {
  private logger: log4js.Logger;

  constructor() {
    this.logger = logger.getLogger();
  }

  public async update(req: Request, res: Response) {
    const userId = req.params.userId;
    const body = req.body;

    try {
      await User.update(body, {
        where: { id: userId, active: true },
      });

      res.status(200).json({ updated: true });
    } catch (err) {
      console.error(err);
      this.logger.error(err);
      res.status(500).send({ message: "Failed to update user!" });
    }
  }

  public async delete(req: Request, res: Response) {
    const userId = req.params.userId;

    try {
      await User.update(
        { active: false },
        {
          where: { id: userId, active: true },
        }
      );

      res.status(200).json({ message: "User deleted successfully. " });
    } catch (err) {
      console.error(err);
      this.logger.error(err);
      res.status(500).send({ message: "Failed to delete user!" });
    }
  }
}
