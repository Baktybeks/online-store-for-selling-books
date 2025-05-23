const { Application, Book, Genre } = require('../models/models');
const ApiError = require('../error/ApiError');


class ApplicationController {
    async create(req, res, next) {
        try {
            const { name, phone, paymentMethod, delivery, processed, approved, address, BookId } = req.body;
            const data = await Application.create({
                BookId,
                name,
                phone,
                paymentMethod,
                delivery,
                approved,
                processed,
                address
            });
            return res.json(data);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const data = await Application.findAll({
            order: [
                [ 'processed', 'ASC' ],
                [ 'createdAt', 'DESC' ]
            ],
            include: [
                {
                    model: Book,
                    as: 'Book',
                    attributes: [ 'title', 'author', 'publication_year', 'description', 'bestseller', 'isNew', 'price', 'discount', 'GenreId' ],
                    include: [
                        {
                            model: Genre,
                            as: 'Genre',
                            attributes: [ 'genre', 'cover_image' ],
                        }
                    ]
                }

            ],

        });
        return res.json(data);
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Application.destroy({ where: { id } });
            if (deleted) {
                return res.json({ message: 'Deleted successfully' });
            }
            throw new Error('Direction not found');
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateProcessed(req, res, next) {
        try {
            const { id } = req.params;
            const { processed, approved } = req.body;

            const updatedApplication = await Application.update(
                { processed, approved },
                { where: { id } }
            );

            if (updatedApplication[ 0 ] === 1) {
                return res.json({ message: 'updated successfully' });
            } else {
                throw new Error('Application not found');
            }
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ApplicationController();
