import { Router } from "express";
import { deleteUser, getProfileImage, getUser, updateUserProfileImage } from "../controllers/userController.js";
import {noBrowserCache} from '../middleware/noBrowserCache.js';

const router = new Router();

router.get('/user', getUser);

router.delete('/user/:id', noBrowserCache, deleteUser);

router.patch('/user/:id', updateUserProfileImage);

router.get('/user/:id/image', getProfileImage);

export default router;