import sinon from "sinon";
import UsersController from "../../../src/controllers/user";
import { Request, Response } from "express";

describe("Controller: Users", () => {
  const defaultRequest = {
    params: {},
  } as Request;

  const defaultResponse = {
    send: jest.fn(),
    status: sinon.stub(),
  };

  describe("index()", () => {});
});
