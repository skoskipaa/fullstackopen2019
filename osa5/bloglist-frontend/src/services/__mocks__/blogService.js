const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'Scrum Guides',
    author: 'Sutherland & Schwaber',
    url: 'https://scrumguides.org',
    likes: 300,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'iines',
      name: 'Iines Ankka'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'A website on building software efficiently',
    author: 'Martin Fowler',
    url: 'https://martinfowler.com',
    likes: 200,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'iines',
      name: 'Iines Ankka'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'MIT OpenCourseWare',
    author: 'MIT',
    url: 'https://ocw.mit.edu/courses/index.htm#science-technology-and-society',
    likes: 1453,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'iines',
      name: 'Iines Ankka'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {

}

export default { getAll, setToken }