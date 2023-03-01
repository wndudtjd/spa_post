const express = require('express')
const Posts = require('../schemas/post')
const Comment = require('../schemas/comment')
const router = express.Router()

// 댓글 목록 조회 : /posts/:_postId/comments GET
router.get('/', async (req, res) => {
  const { postsId } = req.params

  const currentPosts = await Posts.find({ _id: postsId })

  if (!currentPosts.length) {
    return res.status(400).json({ success: false, errorMessage: '게시글이 존재하지 않습니다.' })
  }

  const comments = await Comment.find({ postsId: postsId }).sort({ createdAt: -1 })

  const data = []
  for (let i = 0; i < comments.length; i++) {
    data.push({
      commentsId: comments[i]._id,
      user: comments[i].user,
      content: comments[i].content,
      createdAt: comments[i].createdAt,
    })
  }

  res.json({ data: data })

  module.exports = router
})

// 댓글 작성 : /posts/:_postId/comments POST
router.post('/', async (req, res) => {
  const { postsId } = req.params
  const { user, password, content } = req.body
  const CurrentPosts = await Posts.findOne({ _id: postsId })

  if (!CurrentPosts) {
    return res.status(400).json({ success: false, errorMessage: '게시글이 존재하지 않습니다.' })
  }

  let now = new Date()
  await Comment.create({ postsId: postsId, user: user, password: password, content: content, createdAt: now })

  res.json({ message: '댓글을 생성하였습니다.' })
})

// 댓글 수정 : /posts/:_postId/comments/:_commentId

module.exports = router
