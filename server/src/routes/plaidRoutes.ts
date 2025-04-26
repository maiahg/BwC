import express from 'express';
import {
    createLinkToken,
} from '../controllers/plaidControllers';
const router = express.Router();


router.post("/create-link-token", createLinkToken);

export default router;