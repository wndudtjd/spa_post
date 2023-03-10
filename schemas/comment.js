const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postsId: {            //고유번호
        type: String, 
        required: true,
    },
    user: {               //작성자명
        type: String,
        required: true,
    },
    password: {           // 비밀번호
        type: String,
        required: true,
    },
    content: {            // 댓글
        type: String,
        required: true,
    },
    createdAt: {            // 시간
        type: Date,
        required: false,
    },
    
}, { versionKey : false });

module.exports = mongoose.model("Comment", commentSchema);