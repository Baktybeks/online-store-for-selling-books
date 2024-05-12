const { Genre } = require('../models/models')
const ApiError = require('../error/ApiError')


class GenreController {
  async create(req, res, next) {
    try {
      const {genre} = req.body
      const data = await Genre.create({genre})
      return res.json(data)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res) {
    const data = await Genre.findAndCountAll()
    return res.json(data)
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Genre.destroy({ where: { id } });
      if (deleted) {
        return res.json({ message: "Deleted successfully" });
      }
      throw new Error("Genre not found");
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new GenreController()
