import MessageRepository from "./message.repository.js"
class MessageService {
    async postMessage(payload, res) {
        const result = await MessageRepository.postMessage(payload);
        return result;
    }

    async getMessageByChattingWithId(req, res) {
        const { id: chattingWithId } = req.params;
        const result = await MessageRepository.getMessageByChattingWithId(chattingWithId);
    }


    //deleting all message
    async deleteAll(req, res) {
        const result = await MessageRepository.deleteAll();
        res.status(200).send({ message: 'success', });
    }
}

export default new MessageService;