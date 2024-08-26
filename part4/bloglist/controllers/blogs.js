const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { blogsInDb } = require('../tests/test_helper')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  })


/*   blogsRouter.post('/', async (request, response) => {
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
  }) */

  blogsRouter.post('/', async (request, response) => {
    const body = request.body
  
    const user = await User.findById("66cc72475930b133fcc3ccde")
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  
    response.status(201).json(savedBlog)
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




