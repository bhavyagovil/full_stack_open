const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


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
        return response.status(400).json({ error: error.message });
      }
      response.status(500).json({ error: error.message });
    }
  });

  /*  const savedBlog = await blog.save()
    response.status(201).json(savedBlog) */


    blogsRouter.delete('/:id', async (request, response) => {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    })

    

  module.exports = blogsRouter




