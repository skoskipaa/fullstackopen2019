const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

describe('when there is only one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username:'root', password: 'sekret' })
        await user.save()

    }) 

    test('user creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDatabase()

        const newUser = {
            username: 'mjarvinen',
            name: 'Matti Jarvinen',
            password: 'supersalainen'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDatabase()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)

    })

    test('user creation fails with proper status code and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDatabase()

        const newUser = {
            username: 'root',
            name: 'superuser',
            password: 'salaisuus'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDatabase()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user creation fails if username is too short', async () => {
        const usersAtStart = await helper.usersInDatabase()

        const newUser = {
            username: 'jo',
            name: 'Jonne92',
            password: 'salaisuus'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('is shorter than')

        const usersAtEnd = await helper.usersInDatabase()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user creation fails if username is missing', async () => {
        const usersAtStart = await helper.usersInDatabase()

        const newUser = {
            username: '',
            name: 'Jonne92',
            password: 'salaisuus'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('is required')

        const usersAtEnd = await helper.usersInDatabase()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user creation fails if password is too short', async () => {
        const usersAtStart = await helper.usersInDatabase()

        const newUser = {
            username: 'jonne92',
            name: 'Jonne Z',
            password: 'jo'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('too short')

        const usersAtEnd = await helper.usersInDatabase()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user creation fails if password is missing', async () => {
        const usersAtStart = await helper.usersInDatabase()

        const newUser = {
            username: 'jonne92',
            name: 'Jonne Z',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('required')

        const usersAtEnd = await helper.usersInDatabase()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})