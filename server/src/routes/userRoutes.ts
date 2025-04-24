import express from 'express';
import {
    getUser,
    createUser,
} from '../controllers/userControllers';
const router = express.Router();

router.get("/:cognitoId", getUser);
router.post("/", createUser);

export default router;