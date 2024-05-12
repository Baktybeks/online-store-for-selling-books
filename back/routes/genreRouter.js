const Router = require('express')
const router = new Router()
const genreController = require('../controllers/genreController')

router.post('/', genreController.create)
router.get('/', genreController.getAll)
router.delete('/:id', genreController.deleteOne)

module.exports = router
