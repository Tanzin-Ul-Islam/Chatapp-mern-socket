import UserService from "./user.service.js";
import express from 'express';

const router = express.Router();

router.get('/all', UserService.getAllUser);

export default router;