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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}