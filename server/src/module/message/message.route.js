import MessageService from "./message.service.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import express from 'express';

const router = express.Router();

router.get('/:id', authMiddleware, MessageService.getMessageByChattingWithId);
router.delete('/', MessageService.deleteAll);

export default router;