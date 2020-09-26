import { Request, Response } from "express";
import log4js from "log4js";
import logger from "../../src/utils/logger";

export default class UserController {
  private logger: log4js.Logger;

  constructor() {
    this.logger = logger.getLogger();
  }

  public async index(req: Request, res: Response) {}
}
