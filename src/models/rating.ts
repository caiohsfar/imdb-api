import Sequelize, { Model } from "sequelize";
import database from "../database/connection";
import Movie from "./movie";
import User from "./user";

class Rating extends Model {
  public id!: number;

  public rating!: string;

  public userId!: number;

  public movieId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Rating.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },

    movieId: {
      type: Sequelize.INTEGER,
      references: {
        model: Movie,
        key: "id",
      },
    },

    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: database,
  }
);

export default Rating;
