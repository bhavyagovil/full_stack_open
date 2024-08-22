const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { blogsInDb } = require('../tests/test_helper')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    response.json(blogs)
  })

/*   blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    console.log(Blog)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      }).catch(err => next(err)) 
  }) */

  blogsRouter.post('/', async (request, response) => {
    try {
      const blog = new Blog(request.body);
      const savedBlog = await blog.save();
      response.status(201).json(savedBlog);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }
      response.status(500).json({ error: error.message })
    }
  })

    blogsRouter.delete('/:id', async (request, response) => {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    })

    blogsRouter.put('/:id', async (request, response) => {
      try{ const body = request.body
        const blog = {
         title: body.title,
         author: body.author,
         url: body.url,
         likes: body.likes
        }
   
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        response.json(updatedBlog)} catch (error) {next(error)}
    })
    

  module.exports = blogsRouter




