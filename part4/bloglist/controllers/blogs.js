const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    response.json(blogs)
  })

  blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    console.log(Blog)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      }).catch(err => next(err)) 
  })

  /*  const savedBlog = await blog.save()
    response.status(201).json(savedBlog) */

  module.exports = blogsRouter




