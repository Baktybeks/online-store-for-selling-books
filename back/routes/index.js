const Router = require('express')
const router = new Router()
const bookRouter = require('./bookRouter')
const applicationRouter = require('./applicationRouter')
const userRouter = require('./userRouter')
const genreRouter = require('./genreRouter')

router.use('/book', bookRouter)
router.use('/application', applicationRouter)
router.use('/user', userRouter)
router.use('/genre', genreRouter)



module.exports = router
