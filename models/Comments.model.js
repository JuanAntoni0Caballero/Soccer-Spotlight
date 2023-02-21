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
        }
    },
    {
        timestamps: true
    }
)



const comment = model('Comment', commentSchema)

module.exports = comment;