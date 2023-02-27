const express = require("express");
const Posts = require("../schemas/post.js");
const router = express.Router();

// 게시글 조회 : /posts GET
router.get("/posts", async (req, res) => {

  const dataAll = await Posts.find().sort({ createdAt: -1 })

  const data = []
  for (let i = 0; i < dataAll.length; i++) {
      data.push({
          postId: dataAll[i]._id.toString(),
          user: dataAll[i].user,
          title: dataAll[i].title,
          createdAt: dataAll[i].createdAt
      });
  }

  res.json({ data : data });
});

// 게시글 상세 조회 : /posts/:_postId GET
router.get("/posts/:postsId", async (req, res) => {

  const { postsId } = req.params;
  console.log("req.params",req.params)
  console.log(typeof(req.params))

  const currentPost = await Posts.find({ _id : postsId });
  console.log(currentPost)


  if (!currentPost.length) {
      return res.status(400).json({ success: false, errorMessage: "게시글이 존재하지 않습니다." });
  }


  // const posts = await Posts.find();
  // const filteredPosts = posts.filter((e) => e["_id"].toString() === postsId);
  // console.log("filteredPosts",filteredPosts)
  // const data = 
  //     {
  //       postsId: filteredPosts[0]._id.toString(),
  //       user: filteredPosts[0].user,
  //       title: filteredPosts[0].title,
  //       content: filteredPosts[0].content,
  //       createdAt: filteredPosts[0].createdAt,
  //     }
  // res.json({ data });
  res.json({ currentPost });
});

// 게시글 작성 : /posts POST
router.post("/posts", async (req, res) => {
  const { user, password, title, content } = req.body

  let now = new Date()
  await Posts.create({ user : user, password : password, title : title, content : content, createdAt: now });

  res.json({ "message" : "게시글이 생성하였습니다." })
});


module.exports = router;