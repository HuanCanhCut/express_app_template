import express from 'express'
const router = express.Router()

import UserController from '../app/controllers/UserController'
import { validate } from '~/app/middlewares/validate'
import { nicknameSchema } from '~/app/validators/api/userSchema'

router.get('/:nickname', validate(nicknameSchema), UserController.getUserByNickname)

export default router
