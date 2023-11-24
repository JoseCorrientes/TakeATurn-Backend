import { Router}  from 'express'
import turns from './turns.route.js'
import mails from './mails.route.js'

const router = Router()

router.use('/turns', turns)
router.use('/mails', mails)

export default router;