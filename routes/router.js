const express = require('express')
const router = new express.Router()
const Constants = require('../constants/Constants')
const Movies = require('../controllers/Movies')
const ErrorHandler = require('../utility/ErrorHandler').handleError
const Authenticate = require('../utility/Authenthication').authenticate
const Authorize = require('../utility/Authorization').authorize
const RequestLogger = require('../utility/RequestLogger')
//  Global handlers
router.use(RequestLogger)
router.get('/', (req, res) => {
    res.json({
        error: false,
        success: true,
        message: Constants.MSG_WELCOME,
        data: {},
    })
})
// heartbeat
router.get('/v1/check/heartbeat', (req, res) => {
    res.status(200).send({})
})
//  Unprotected handlers
//  Protected handlers
router.use(Authenticate)
router.use(Authorize)
// Movies
router.get('/v1/movies/:id', Movies.read)
router.get('/v1/movies', Movies.query)
router.post('/v1/movies', Movies.create)
router.put('/v1/movies/:id', Movies.updateOne)
router.delete('/v1/movies/:id', Movies.deleteOne)
// functional routes
router.get('/v1/movies/search/name/:id', Movies.searchByName)
router.get('/v1/movies/search/year/:id', Movies.searchByYear)
//  Other handlers
router.use(ErrorHandler)
// exports all routes
module.exports = router
