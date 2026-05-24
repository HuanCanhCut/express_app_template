import express from 'express'
const router = express.Router()

import MeController from '../app/controllers/MeController'
import verifyToken from '../app/middlewares/verifyToken'
import { validate } from '~/app/middlewares/validate'
import { updateUserSchema } from '~/app/validators/api/userSchema'

router.get('/', verifyToken, MeController.getCurrentUser)
router.patch('/update', validate(updateUserSchema), verifyToken, MeController.updateUser)

export default router
