import message from './message.model.js'
class MessageRepository {
    async postMessage(payload) {
        const result = await message.create(payload);
        return result;
    }
    async getMessageByChattingWithId() {
        return;
    }
    async deleteAll() {
        const result = await message.deleteMany({});
        return result;
    }
}

export default new MessageRepository