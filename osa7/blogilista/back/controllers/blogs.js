const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
        .populate('comments')
    response.json(blogs.map(blog => blog.toJSON()))
    })

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
    
        const user = await User.findById(decodedToken.id).populate('user')
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user
        })

    
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(savedBlog.toJSON())
    } catch(exception) {
        next(exception)
    }

})

blogsRouter.post('/:id/comments', async (request, response, next) => {
    const body = request.body

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const blog = await Blog.findById(request.params.id).populate('blog')
        const comment = new Comment({
            content: body.content,
            blog: blog
        })

        const savedComment = await comment.save()
        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()

        response.json(savedComment.toJSON())

    } catch(exception) {

        next(exception)

    }
})

/*blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})*/

blogsRouter.delete('/:id', async (request, response, next) => {        
        try {
            const blogToDelete = await Blog.findById(request.params.id)
            const decodedToken = jwt.verify(request.token, process.env.SECRET)
            
            if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
            }

            const user = await User.findById(decodedToken.id)
            
            if (blogToDelete.user.toString() !== user._id.toString()) {
                return response.status(403).json({ error: 'Not allowed' })
            }

            try {
                await Blog.findByIdAndRemove(request.params.id)
                response.status(204).end()
            } catch (exception) {
                next(exception)
            }

        } catch (exception) {
            next(exception)
        }
    
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = await request.body

    const blog = {
        likes: body.likes
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user')
        response.json(updatedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter