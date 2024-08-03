import { Router } from "express";
import { deleteUser, getUser } from "../controllers/userController.js";
import {noBrowserCache} from '../middleware/noBrowserCache.js';

const router = new Router();

router.get('/user', getUser);

router.delete('/user/:id', noBrowserCache, deleteUser);

export default router;