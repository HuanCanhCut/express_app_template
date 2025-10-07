import { Request } from 'express'

export interface IRequest extends Request {
    decoded?: string | JwtPayload
}

export interface MulterRequest extends Request, IRequest {
    files?: {
        avatar?: Express.Multer.File[]
        cover_photo?: Express.Multer.File[]
    }
}
