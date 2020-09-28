import { Request, Response } from "express";
import log4js from "log4js";
import logger from "../../src/utils/logger";
import Movie from "../models/movie";
import User from "../models/user";
import sequelize from "../database/connection";
import Rating from "../models/rating";

export default class MovieController {
  private logger: log4js.Logger;

  constructor() {
    this.logger = logger.getLogger();
  }

  public async index(req: Request, res: Response) {
    try {
      const movies = await Movie.findAll({
        subQuery: false,

        attributes: [
          "id",
          "name",
          "description",
          "createdAt",
          "updatedAt",

          [
            sequelize.fn("avg", sequelize.col("ratings.rating")),
            "averageRating",
          ],

          [
            sequelize.fn("count", sequelize.col("ratings.rating")),
            "amountOfRatings",
          ],
        ],

        include: [
          {
            model: Rating,
            as: "ratings",
            attributes: [],
          },
        ],

        group: ["id", "name", "description", "createdAt", "updatedAt"],
      });

      res.status(200).json(movies);
    } catch (err) {
      console.log(err);
      this.logger.error(err);
      res.status(500).send({ message: "Someting went wrong" });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      await Movie.create(req.body);
      res.status(201).json({ message: "Movie created successfully" });
    } catch (err) {
      this.logger.error(err);
      res.status(500).send({ message: "Failed to create movie!" });
    }
  }

  public async rate(req: Request, res: Response) {
    const userId = req.params.userId;
    const { rating, movieId } = req.body;

    try {
      if (rating > 4 || rating < 0) {
        return res
          .status(400)
          .send({ message: "The rating must be between 0 and 4." });
      }

      const existRate = await Rating.findOne({ where: { userId, movieId } });

      if (existRate) {
        await Rating.update({ rating }, { where: { userId, movieId } });
      } else {
        await Rating.create({ userId, rating, movieId });
      }

      res.status(200).json({ message: "Voted successfully" });
    } catch (err) {
      res.status(500).send({ message: "Failed to create a rating!" });
    }
  }
}
