const _ = require('lodash');


const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  let likesSum = 0;
  blogs.forEach(blog => likesSum = likesSum + blog.likes)
  console.log(likesSum)
  return likesSum
}

const favoriteBlog = (blogs) => {
  let likes = blogs.map(blog => blog.likes)
  let favoriteBlog = blogs.find(blog => blog.likes === Math.max(...likes))
  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  }

}

const mostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const authorBlogCounts = _.map(groupedByAuthor, (authorBlogs, author) => ({
      author: author,
      blogs: authorBlogs.length
  }))
  const topAuthor = _.maxBy(authorBlogCounts, 'blogs');
  return topAuthor;
}

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')
const likes = _.mapValues(groupedByAuthor, authorBlogs =>
  _.sumBy(authorBlogs, 'likes')
);
const topAuthor = _.maxBy(_.keys(likes), author => likes[author]);
return { author: topAuthor, likes: likes[topAuthor] };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}