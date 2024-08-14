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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}