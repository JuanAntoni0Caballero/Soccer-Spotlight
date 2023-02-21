const { Schema, model } = require("mongoose");

const dreamTeamSchema = new Schema(
    {
        defense: {
            type: Number,
            enum: [3, 4, 5]
        },
        midfield: {
            type: Number,
            enum: [3, 4, 5]
        },
        offernse: {
            type: Number,
            enum: [3, 4, 5]
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



const DreamTeam = model('DreamTeam', dreamTeamSchema)

module.exports = DreamTeam;