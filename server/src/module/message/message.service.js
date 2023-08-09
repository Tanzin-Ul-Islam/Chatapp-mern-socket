import MessageRepository from "./message.repository.js"
class MessageService {
    async postMessage(payload, res) {
        const result = await MessageRepository.postMessage(payload);
        return result;
    }

    async getMessageByChattingWithId(req, res) {
        const { id: chattingWithId } = req.params;
        const { id: userId } = res.locals.userInfo;
        const result = await MessageRepository.getMessageByChattingWithId(userId, chattingWithId);
        res.status(200).send({ message: 'success', data: result });
    }


    //deleting all message
    async deleteAll(req, res) {
        const result = await MessageRepository.deleteAll();
        res.status(200).send({ message: 'success', });
    }
}

export default new MessageService;