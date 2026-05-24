import { NextFunction, Response } from 'express'

import { NotFoundError } from '../errors/errors'
import { responsePagination } from '../response/responsePagination'
import { clearCookie } from '../utils/cookiesManager'
import { PaginationRequest } from '../validators/api/commonSchema'
import { UpdateUserRequest } from '../validators/api/userSchema'
import UserService from '~/app/services/UserService'
import { IRequest } from '~/type'

class MeController {
    // [GET] /auth/me
    getCurrentUser = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            const decoded = req.decoded

            const user = await UserService.getUserById(decoded.sub)

            res.json({ data: user })
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                clearCookie({ res, cookies: ['access_token', 'refresh_token'], req })
            }

            return next(error)
        }
    }

    // [PATCH] /me
    updateUser = async (req: UpdateUserRequest, res: Response, next: NextFunction) => {
        try {
            const decoded = req.decoded

            const { nickname, first_name, last_name, avatar } = req.body

            const updatedUser = await UserService.updateUserById({
                id: Number(decoded.sub),
                nickname,
                first_name,
                last_name,
                avatar,
            })

            res.json({ data: updatedUser })
        } catch (error) {
            return next(error)
        }
    }
}

export default new MeController()
