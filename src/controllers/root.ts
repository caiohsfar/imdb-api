import { Request, Response } from "express";
const project = require("../../package.json");

class RootController {
  public index(req: Request, res: Response): void {
    res.json(project);
  }
}

export default new RootController();
