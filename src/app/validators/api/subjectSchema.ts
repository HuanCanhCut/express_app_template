import { z } from 'zod'

import { idSchema, paginationSchema } from './commonSchema'
import { TypedRequest } from '~/types/request'

export const createSubjectSchema = z.object({
    body: z.object({
        name: z.string().trim(),
        description: z.string(),
        code: z.string().trim(),
        credits: z.coerce.number().int().positive(),
        category_id: z.coerce.number().int().positive(),
        thumbnail: z.string().optional(),
    }),
})

export const updateSubjectSchema = z.object({
    body: z.object({
        name: z.string().trim().optional(),
        description: z.string().optional(),
        code: z.string().trim().optional(),
        credits: z.coerce.number().int().positive().optional(),
        category_id: z.coerce.number().int().positive().optional(),
        thumbnail: z.string().optional(),
    }),
    params: idSchema.extend({}).shape.params,
})

export const getSubjectsSchema = z.object({
    query: paginationSchema.shape.query.extend({
        user_id: z.coerce.number().int().positive().optional().transform(String),
    }),
})

export type GetSubjectsRequest = TypedRequest<any, any, z.infer<typeof getSubjectsSchema>['query']>
export type CreateSubjectRequest = TypedRequest<z.infer<typeof createSubjectSchema>['body']>
export type UpdateSubjectRequest = TypedRequest<
    z.infer<typeof updateSubjectSchema>['body'],
    z.infer<typeof updateSubjectSchema>['params']
>
