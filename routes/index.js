const express = require('express')
const postsRouter = require('./posts')
const commentsRouter = require('./comments')

const router = express.Router()

router.use('/posts', [postsRouter, commentsRouter])
// router.use('/posts/:postsId/comments', commentsRouter)

module.exports = router
