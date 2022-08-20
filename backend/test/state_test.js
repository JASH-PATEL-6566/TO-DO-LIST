const assert = require('assert')
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
    it('handle a GET request', (done) => {
        request(app)
            .get('/')
            .end((err, response) => {
                assert(response.body.hi === 'there')
                done()
            })
    })
})