import { AppError, InternalServerError, NotFoundError } from '../errors/errors'
import { User } from '../models'

class UserService {
    getUserById = async (id: number) => {
        try {
            const user = await User.findByPk(id)

            if (!user) {
                throw new NotFoundError({ message: 'Không tìm thấy người dùng' })
            }

            return user
        } catch (error: any) {
            if (error instanceof AppError) {
                throw error
            }

            throw new InternalServerError({ message: error.message })
        }
    }

    getUserByNickname = async (nickname: string) => {
        try {
            const user = await User.findOne({ where: { nickname } })

            if (!user) {
                throw new NotFoundError({ message: 'Không tìm thấy người dùng' })
            }

            return user
        } catch (error: any) {
            if (error instanceof AppError) {
                throw error
            }

            throw new InternalServerError({ message: error.message + ' - ' + error.stack })
        }
    }

    updateUserById = async ({
        id,
        nickname,
        first_name,
        last_name,
        avatar,
    }: {
        id: number
        nickname: string
        first_name: string
        last_name: string
        avatar: string
    }) => {
        try {
            const user = await User.findByPk(id)

            if (!user) {
                throw new NotFoundError({ message: 'Không tìm thấy người dùng' })
            }

            await User.update({ nickname, first_name, last_name, avatar }, { where: { id } })

            return await User.findByPk(id)
        } catch (error: any) {
            throw new InternalServerError({ message: error.message })
        }
    }
}

export default new UserService()
