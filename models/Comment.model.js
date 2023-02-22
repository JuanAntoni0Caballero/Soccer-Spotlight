const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {

        comment: {
            type: String,
            trim: true,
            minlength: 1,
            maxlenghth: 200,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        match: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)



const Comment = model('Comment', commentSchema)

module.exports = Comment;