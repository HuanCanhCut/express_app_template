import { z } from 'zod'

import { TypedRequest } from '~/types/request'
import { CommentableType } from '~/types/socket'

export const getAllCommentsSchema = z.object({
    params: z.object({
        commentable_type: z.enum(CommentableType),
        commentable_id: z.coerce.number().int().positive().transform(String),
    }),
    query: z.object({
        limit: z.coerce.number().int().positive().transform(String),
        offset: z.coerce.number().int().nonnegative().transform(String),
    }),
})

export type GetAllCommentsRequest = TypedRequest<
    any,
    z.infer<typeof getAllCommentsSchema>['params'],
    z.infer<typeof getAllCommentsSchema>['query']
>
