import Sequelize, { Model } from "sequelize";
import database from "../database/connection";

class Movie extends Model {
  public id!: number;

  public name!: string;

  public description!: string;

  public director!: string;

  public actors!: string;

  public genders!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Movie.init(
  {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    director: Sequelize.STRING,
    actors: Sequelize.STRING,
    genders: Sequelize.STRING,
  },
  {
    sequelize: database,
  }
);

export default Movie;
