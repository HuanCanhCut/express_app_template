import { z } from 'zod'

import { uuidSchema } from './commonSchema'
import { TypedRequest } from '~/types/request'

export const getAllMessagesSchema = z.object({
    query: z.object({
        limit: z.coerce.number().int().positive().transform(String),
        offset: z.coerce.number().int().nonnegative().transform(String),
    }),
    params: uuidSchema.shape.params,
})

export const createTopicSchema = z.object({
    body: z.object({
        title: z.string().trim(),
        thumbnail: z.url(),
        description: z.string(),
    }),
})

export const updateTopicSchema = z.object({
    body: z.object({
        title: z.string().trim().optional(),
        thumbnail: z.url(),
        description: z.string().optional(),
    }),
})

export type GetAllMessagesRequest = TypedRequest<
    any,
    z.infer<typeof getAllMessagesSchema>['params'],
    z.infer<typeof getAllMessagesSchema>['query']
>
export type CreateTopicRequest = TypedRequest<z.infer<typeof createTopicSchema>['body']>
export type UpdateTopicRequest = TypedRequest<z.infer<typeof updateTopicSchema>['body']>
