const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  let likesSum = 0;
  blogs.forEach(blog => likesSum = likesSum + blog.likes)
  console.log(likesSum)
  return likesSum
}

module.exports = {
  dummy,
  totalLikes
}