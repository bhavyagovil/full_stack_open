
const bcrypt = require('bcrypt')
const { test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }]

describe('when there is initially some blogs in the db', () => {

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save() 
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
    console.log()
  })

  test('every blog post has a unique identifier property named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
      blogs.forEach(blog => {
        assert(blog.id !== undefined)
      })
  })

})

describe('adding blog to the db', () => {

  test('a valid blogpost can be added', async () => {
    const newBlog = {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    }
  
    await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const content = response.body.map(r => r.title)
    assert.strictEqual(response.body.length, initialBlogs.length + 1)
  
    assert(content.includes('TDD harms architecture'))
  
  })
  
  test('if likes property missing, default to 0', async () => {
    const newBlog = {
      title: "Example",
      author: "Name",
      url: "http://urlplaceholder.html"
    }
    const savedBlog = await Blog.create(newBlog);
    assert.strictEqual(savedBlog.likes, 0)
  
  })
  
  test('fails with status code 400 if title is missing', async () => {
    const newBlog = {
      author: "Name",
      url:"http://urlplaceholder.html"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  
  test('fails with status code 400 if url is missing', async () => {
    const newBlog = {
      title: "Example",
      author: "Name"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

})


describe('deleting a blog', () => {
  test('deletes a blog with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  
    const titles = blogsAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
  })  

})

describe('updating a blog', () => {

test('check if a blog is updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const blogWithUpdate = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 1
}

await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogWithUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/)

const blogsAtEnd = await Blog.find({})
const updatedBlog = blogsAtEnd[0]
assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1)
})

})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'bhavgov',
      name: 'Bhavya Govil',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})

  after(async () => {
    await mongoose.connection.close()
  })
