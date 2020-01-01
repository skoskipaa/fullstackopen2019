const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = ( blogs ) => {
    const likes = blogs.map(blog => blog.likes)
    const reducer = (sum, item) => {
        return sum + item
    }

    return likes.length === 0
    ? 0
    : likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const maxLikes = Math.max(...likes)
    const favorite = blogs.find(blog => blog.likes === maxLikes)
    
    return {
        "title": favorite.title,
        "author": favorite.author,
        "likes": favorite.likes
    }
}

const mostBlogs = (blogs) => {
    const blogCountsByAuthor = lodash.countBy(blogs, 'author')
    const maxAuthor = lodash(blogCountsByAuthor).keys().values().max()
    const maxVal = lodash(blogCountsByAuthor).values().max()

    return {
        "author": maxAuthor,
        "blogs": maxVal
    }
}

const mostLikes = (blogs) => {
    const likesByAuthor = lodash(blogs).groupBy('author').map((obj, key) => ({
        'author': key,
        'likes': lodash.sumBy(obj, 'likes')
    })).value()

    const most = favoriteBlog(likesByAuthor)

    return {
        "author": most.author,
        "likes": most.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}