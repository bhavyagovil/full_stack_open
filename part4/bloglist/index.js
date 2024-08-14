/* const config = require('./utils/config')//app.js
const express = require('express')//app.js
const app = express()//app.js
const cors = require('cors')//app.js
const Blog = require('./models/blog')

//app.js
app.use(cors())
app.use(express.json())


//controllers - blogs.js
 app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
}) 

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) */


const app = require('./app') // The Express app
const config = require('./utils/config')

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})