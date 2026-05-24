import { z } from 'zod'

import { idSchema, paginationSchema } from './commonSchema'
import { TypedRequest } from '~/types/request'

export const getTextbooksSchema = z.object({
    query: paginationSchema.shape.query.extend({
        user_id: z.coerce.number().int().positive().optional().transform(String),
    }),
})

export const getSubjectTextbooksSchema = z.object({
    params: idSchema.shape.params,
    query: paginationSchema.shape.query.extend({
        user_id: z.coerce.number().int().positive().optional().transform(String),
    }),
})

export const createTextbookSchema = z.object({
    body: z.object({
        subject_id: z.coerce.number().int().positive(),
        title: z.string().trim(),
        author: z.string().trim(),
        publisher: z.string().trim(),
        published_year: z.coerce.number().int().positive(),
        file_path: z.url(),
        description: z.string(),
        thumbnail: z.url().optional(),
        file_type: z.string(),
    }),
})

export const updateTextbookSchema = z.object({
    params: idSchema.extend({}).shape.params,
    body: createTextbookSchema.shape.body.partial(),
})

export type GetTextbooksRequest = TypedRequest<any, any, z.infer<typeof getTextbooksSchema>['query']>
export type CreateTextbookRequest = TypedRequest<z.infer<typeof createTextbookSchema>['body']>
export type UpdateTextbookRequest = TypedRequest<
    z.infer<typeof updateTextbookSchema>['body'],
    z.infer<typeof idSchema>['params']
>
export type GetSubjectTextbooksRequest = TypedRequest<
    any,
    z.infer<typeof getSubjectTextbooksSchema>['params'],
    z.infer<typeof getSubjectTextbooksSchema>['query']
>
