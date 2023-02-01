// Uploads
import express from 'express'
import wrapper from "../lib/route_wrapper.js"
import { authAdmin} from '../middleware/account.js'
import Participant from '../models/Participant.js';

const router = express.Router();

router.get("/", authAdmin, wrapper(req => {
    return Participant.findAll()
}))


export default router