const express = require("express");
const Posts = require("../schemas/post");
const Comment = require("../schemas/comment");
const router = express.Router();

// 댓글 목록 조회 : /comments/:postsId GET
router.get("/:postsId", async (req, res) => {

  const { postsId } = req.params;

  const currentPosts = await Posts.find({ _id : postsId })

  if(!currentPosts.length) {
    return res.status(400).json({ success : false, errorMessage : "게시글이 존재하지 않습니다." })
  }

  const comments = await Comment.find({ postsId : postsId }).sort({ createdAt : -1 })

  const data = [];
  for(let i = 0; i < comments.length; i++) {
    data.push({
      commentsId : comments[i]._id,
      user : comments[i].user,
      content : comments[i].content,
      createdAt : comments[i].createdAt
    });
  }

  res.json({ data : data });
})



module.exports = router;