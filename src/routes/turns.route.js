import {Router} from 'express'
import { createTurn, getMonthTurn, deleteTurn } from '../controller/turns.controller.js'
import { sendMailAboutCancelTurn } from '../controller/mails.controller.js'

const router = Router()

router.post('/', createTurn)
router.get('/', getMonthTurn)
router.delete('/', deleteTurn)
router.post('/',sendMailAboutCancelTurn )


export default router;

