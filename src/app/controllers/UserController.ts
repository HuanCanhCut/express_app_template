import { NextFunction, Response } from 'express'

import UserService from '../services/UserService'
import { IdRequest } from '../validators/api/commonSchema'
import { BlockUserRequest, NicknameRequest } from '../validators/api/userSchema'

class UserController {
    // [GET] /users/:nickname
    getUserByNickname = async (req: NicknameRequest, res: Response, next: NextFunction) => {
        try {
            const { nickname } = req.params

            const user = await UserService.getUserByNickname(nickname)

            res.json({ data: user })
        } catch (error) {
            return next(error)
        }
    }
}

export default new UserController()
