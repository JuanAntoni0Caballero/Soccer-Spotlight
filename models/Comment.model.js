const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        title: {
            type: String
        },
        comment: {
            type: String
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        match:{
            type: String,
        }
    },
    {
        timestamps: true
    }
)



const Comment = model('Comment', commentSchema)

module.exports = Comment;