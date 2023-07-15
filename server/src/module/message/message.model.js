import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
    {
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        message:{
            type: String,
            required: true,
        }
    },
    { timeStamps: true }
)

export default mongoose.model('message', MessageSchema)