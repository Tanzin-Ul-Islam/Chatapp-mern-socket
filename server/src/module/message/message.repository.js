import message from './message.model.js'
class MessageRepository {
    async postMessage(payload) {
        const result = await message.create(payload);
        return result;
    }
    async getMessageByChattingWithId(userId, chattingWithId) {
        const result = message.find({
            sender: { $in: [userId, chattingWithId] },
            receiver: { $in: [userId, chattingWithId] },
        }).sort({ createdAt: -1 })
        return result;
    }
    async deleteAll() {
        const result = await message.deleteMany({});
        return result;
    }
}

export default new MessageRepository