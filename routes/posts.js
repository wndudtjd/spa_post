const express = require('express')
const Posts = require('../schemas/post.js')
const router = express.Router()

// 게시글 조회 : /posts GET
router.get('/', async (req, res) => {
  const dataAll = await Posts.find().sort({ createdAt: -1 })

  const data = []
  for (let i = 0; i < dataAll.length; i++) {
    data.push({
      postId: dataAll[i]._id.toString(),
      user: dataAll[i].user,
      title: dataAll[i].title,
      createdAt: dataAll[i].createdAt,
    })
  }

  res.json({ data: data })
})

// 게시글 상세 조회 : /posts/:_postId GET
router.get('/:postsId', async (req, res) => {
  const { postsId } = req.params
  // console.log("req.params",req.params)
  // console.log(typeof(req.params))

  const currentPost = await Posts.findOne({ _id: postsId })
  console.log(currentPost)

  if (!currentPost) {
    return res.status(400).json({ success: false, errorMessage: '게시글이 존재하지 않습니다.' })
  }

  // const posts = await Posts.find();
  // const filteredPosts = posts.filter((e) => e["_id"].toString() === postsId);
  // console.log("filteredPosts",filteredPosts)
  // console.log(filteredPosts[0]._id)
  const data = {
    postsId: currentPost._id.toString(),
    user: currentPost.user,
    title: currentPost.title,
    content: currentPost.content,
    createdAt: currentPost.createdAt,
  }
  res.json({ data })
  // res.json({ currentPost });
})

// 게시글 작성 : /posts POST
router.post('/', async (req, res) => {
  const { user, password, title, content } = req.body

  let now = new Date()
  await Posts.create({ user: user, password: password, title: title, content: content, createdAt: now })

  res.json({ message: '게시글이 생성하였습니다.' })
})

// 게시글 수정 : /posts/:_postsId PUT
router.put('/:postsId', async (req, res) => {
  const { postsId } = req.params
  const { password, title, content } = req.body

  const currentPost = await Posts.find({ _id: postsId })

  if (!currentPost.length) {
    return res.status(400).json({ success: false, errorMessage: '게시글이 존재하지않습니다.' })
  }

  if (password != currentPost[0]['password']) {
    return res.status(404).json({ success: false, errorMessage: '비밀번호가 틀렸습니다.' })
  }

  await Posts.updateOne({ _id: postsId }, { $set: { password: password, title: title, content: content } })

  res.json({ message: '게시글을 수정하였습니다.' })
})

// 게시글 삭제 : /posts/:postsId DELETE
router.delete('/:postsId', async (req, res) => {
  const { postsId } = req.params
  const { password } = req.body

  const currentPost = await Posts.find({ _id: postsId })

  if (!currentPost.length) {
    return res.status(400).json({ success: false, errorMessage: '게시글이 존재하지 않습니다.' })
  }

  if (password != currentPost[0]['password']) {
    return res.status(404).json({ success: false, errorMessage: '비밀번호가 틀렸습니다.' })
  }

  await Posts.deleteOne({ _id: postsId })

  res.json({ message: '게시글을 삭제하였습니다.' })
})
module.exports = router
