const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()

})

test('api returns blogs', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('the count of returned blogs is correct', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('identification field is called id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 12
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDatabase()
    const titles = blogsAtEnd.map(res => res.title)

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    expect(titles).toContain('Type wars')
})

test('set likes to zero if no value is given', async () => {
    const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDatabase()
    const latest = blogsAtEnd.length - 1
    
    expect(blogsAtEnd[latest].likes).toBe(0)

})

test('new blog must have a title and an url', async () => {
    const newBlog = {
        author: "Nora Roberts"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

})

test('a blog can be deleted', async () => {
    const response = await api.get('/api/blogs')
    const blogToDelete = response.body[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const remainingBlogs = await helper.blogsInDatabase()
    expect(remainingBlogs.length).toBe(helper.initialBlogs.length - 1)

    })

test('a blog can be modified', async () => {
    const response = await api.get('/api/blogs')
    const blogToUpdate = response.body[0]

    const updates = {
        likes: 100
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updates)
        .expect(200)

    }) 

afterAll(() => {
    mongoose.connection.close()
})