import supertest, { SuperTest } from "supertest";
import app from "../../../src/app";
import database from "../../../src/database/connection";

describe("Routes: users", () => {
  let request: SuperTest<supertest.Test>;

  beforeAll(async () => {
    request = supertest(app.server);
    // TODO: ROLLBACK AND MIGRATE
  });

  beforeEach(async () => {
    //TODO: TRUNCATE AND SEED
  });

  afterEach(async () => {
    // TODO: MIGRADE
  });

  describe("GET /users", () => {
    test("", (done) => {});
  });
});
