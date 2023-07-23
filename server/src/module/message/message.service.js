import MessageRepository from "./message.repository.js"
class MessageService {
    async postMessage(payload, res){
        const result = await MessageRepository.postMessage(payload);
        return result;
    }
}

export default new MessageService;