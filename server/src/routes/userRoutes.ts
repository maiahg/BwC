import express from 'express';
import {
    getUser,
    createUser,
    updateUser,
} from '../controllers/userControllers';
const router = express.Router();

router.get("/:cognitoId", getUser);
router.post("/", createUser);
router.put("/:cognitoId", updateUser);

export default router;