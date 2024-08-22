

const { test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

test.only('if likes property missing, default to 0', async () => {
  const newBlog = {
    title: "Example",
    author: "Name",
    url: "http://urlplacehoolder.html"
  }
  const savedBlog = await Blog.create(newBlog);
  assert.strictEqual(savedBlog.likes, 0)

})


  after(async () => {
    await mongoose.connection.close()
  })

