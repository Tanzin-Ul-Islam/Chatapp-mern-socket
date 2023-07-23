import message from './message.model.js'
class MessageRepository {
    async postMessage(payload) {
        const result = await message.create(payload);
        return result;
    }
}

export default new MessageRepository