const { Book, Genre } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');


class BookController {
    async create(req, res, next) {
        try {
            const {
                title,
                author,
                publication_year,
                description,
                bestseller,
                isNew,
                price,
                discount,
                GenreId
            } = req.body;
            const { cover_image } = req.files;
            let fileName = uuid.v4() + '.jpg';
            cover_image.mv(path.resolve(__dirname, '..', 'static', fileName));
            const data = await Book.create({
                title,
                author,
                publication_year,
                bestseller,
                description,
                isNew,
                price,
                discount,
                GenreId,
                cover_image: fileName
            });
            return res.json(data);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const data = await Book.findAndCountAll({
            include: [
                {
                    model: Genre,
                    as: 'Genre',
                    attributes: [ 'genre', 'cover_image' ],
                }
            ]
        });
        return res.json(data);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const data = await Book.findOne(
            {
                where: { id }
            }
        );
        return res.json(data);
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Book.destroy({ where: { id } });
            if (deleted) {
                return res.json({ message: 'Deleted successfully' });
            }
            throw new Error('Book not found');
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new BookController();
