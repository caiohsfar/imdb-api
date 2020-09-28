import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";
import Role from "./models/role";
import User from "./models/user";
import Rating from "./models/rating";
import Movie from "./models/movie";

class App {
  public server: express.Application;
  public constructor() {
    this.server = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupDatabaseRelations();
  }

  private setupMiddlewares(): void {
    this.server.use(cors());
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());
  }

  private setupRoutes(): void {
    this.server.use(routes);
  }

  private setupDatabaseRelations(): void {
    Role.belongsToMany(User, { through: "RoleUsers", as: "users" });
    User.belongsToMany(Role, { through: "RoleUsers", as: "roles" });
    User.hasMany(Rating, { as: "ratings" });
    Movie.hasMany(Rating, { as: "ratings" });
    Rating.belongsTo(User);
    Rating.belongsTo(Movie);
  }
}

export default new App();
