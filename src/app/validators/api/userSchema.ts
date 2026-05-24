import { z } from 'zod'

import { idSchema, paginationSchema } from './commonSchema'
import { TypedRequest } from '~/types/request'

export const nicknameSchema = z.object({
    params: z.object({
        nickname: z.string().trim().min(1),
    }),
})

export const updateUserSchema = z.object({
    body: z.object({
        nickname: z.string().trim().min(1),
        first_name: z.string().trim().min(1),
        last_name: z.string().trim().min(1),
        avatar: z.string().trim().min(1),
    }),
})

export const getUserAssignmentsSchema = z.object({
    params: idSchema.shape.params,
    query: paginationSchema.shape.query,
})

export const blockUserSchema = z.object({
    params: idSchema.shape.params,
    body: z.object({
        reason: z.string().trim().min(1),
        content: z.string().trim().optional(),
    }),
})

export type NicknameRequest = TypedRequest<any, z.infer<typeof nicknameSchema>['params']>
export type UpdateUserRequest = TypedRequest<z.infer<typeof updateUserSchema>['body']>
export type GetUserAssignmentsRequest = TypedRequest<
    any,
    z.infer<typeof getUserAssignmentsSchema>['params'],
    z.infer<typeof getUserAssignmentsSchema>['query']
>
export type BlockUserRequest = TypedRequest<
    z.infer<typeof blockUserSchema>['body'],
    z.infer<typeof blockUserSchema>['params']
>
