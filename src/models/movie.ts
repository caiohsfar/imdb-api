import Sequelize, { Model } from "sequelize";
import database from "../database/connection";

class Movie extends Model {
  public id!: number;

  public voteAvg!: number;

  public name!: string;

  public description!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Movie.init(
  {
    name: Sequelize.STRING,
    voteAvg: Sequelize.FLOAT,
    description: Sequelize.STRING,
  },
  {
    sequelize: database.connection,
  }
);

export default Movie;
