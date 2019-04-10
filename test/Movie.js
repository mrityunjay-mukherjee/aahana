//  During the test the env variable is set to test
// process.env.NODE_ENV = 'test'

//  Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
// eslint-disable-next-line no-unused-vars
const should = chai.should()

chai.use(chaiHttp)

const Movie = {
    'name': 'Avengers: Infinity War',
    'year': 2018,
    'plot': 'Avengers: Infinity War is a 2018 American superhero film based on the Marvel Comics superhero team...',
}

const _NewMovie = {
    'name': 'Avengers:',
}

let _id
describe('Movie', () => {
    describe('Movie Test Cases', () => {
        it('it should create a new Movie', (done) => {
            chai.request(server)
                .post('/aahana/api/v1/movies')
                .send(Movie)
                .end((err, res) => {
                    if (err) throw err
                    if (res) console.log('got response')
                    // if (should) console.log(should)
                    res.should.have.status(201)
                    _id = res.body.data.id
                    done()
                })
        })
    })
    describe('Movie Test Cases', () => {
        it('it should update a new Movie', (done) => {
            console.log(_id)
            chai.request(server)
                .put('/aahana/api/v1/movies/' + _id)
                .send(_NewMovie)
                .end((err, res) => {
                    if (err) throw err
                    if (res) console.log('got response')
                    // if (should) console.log(should)
                    res.should.have.status(200)
                    done()
                })
        })
    })
    describe('Movie Test Cases', () => {
        it('it should get a Movie', (done) => {
            chai.request(server)
                .get('/aahana/api/v1/movies/' + _id)
                .send()
                .end((err, res) => {
                    if (err) throw err
                    if (res) console.log('got response')
                    // if (should) console.log(should)
                    res.should.have.status(200)
                    done()
                })
        })
    })
    describe('Movie Test Cases', () => {
        it('it should get all Movies', (done) => {
            chai.request(server)
                .get('/aahana/api/v1/movies')
                .send()
                .end((err, res) => {
                    if (err) throw err
                    if (res) console.log('got response')
                    // if (should) console.log(should)
                    res.should.have.status(200)
                    done()
                })
        })
    })
    describe('Movie Test Cases', () => {
        it('it should get all Movies by name', (done) => {
            chai.request(server)
                .get('/aahana/api/v1/movies/search/name/' + Movie.name)
                .send()
                .end((err, res) => {
                    if (err) throw err
                    if (res) console.log('got response')
                    // if (should) console.log(should)
                    res.should.have.status(200)
                    done()
                })
        })
    })
    describe('Movie Test Cases', () => {
        it('it should get all Movies by year', (done) => {
            chai.request(server)
                .get('/aahana/api/v1/movies/search/year/' + Movie.year)
                .send()
                .end((err, res) => {
                    if (err) throw err
                    if (res) console.log('got response')
                    // if (should) console.log(should)
                    res.should.have.status(200)
                    done()
                })
        })
    })
    describe('Movie Test Cases', () => {
        it('it should delete a movie', (done) => {
            chai.request(server)
                .delete('/aahana/api/v1/movies/' + _id)
                .send()
                .end((err, res) => {
                    if (err) throw err
                    if (res) console.log('got response')
                    // if (should) console.log(should)
                    res.should.have.status(200)
                    done()
                })
        })
    })
})
