import { z } from 'zod'

import { idSchema, paginationSchema } from './commonSchema'
import { TypedRequest } from '~/types/request'

export const getMaterialsSchema = z.object({
    query: paginationSchema.shape.query.extend({
        user_id: z.coerce.number().int().positive().optional().transform(String),
    }),
})

export const getSubjectMaterialsSchema = z.object({
    params: idSchema.shape.params,
    query: paginationSchema.shape.query.extend({
        user_id: z.coerce.number().int().positive().optional().transform(String),
    }),
})

const materialBaseSchema = z.object({
    subject_id: z.coerce.number().int().positive(),
    title: z.string().trim(),
    author: z.string().trim(),
    description: z.string(),
    thumbnail: z.url().optional(),
    type: z.enum(['file_upload', 'youtube']),
    file_type: z.string().optional(),
    file_path: z.url().optional(),
    source_url: z.string().url().optional(),
})

const materialRefinement = (data: z.infer<typeof materialBaseSchema>, ctx: z.RefinementCtx) => {
    if (data.type === 'youtube') {
        if (!data.source_url) {
            ctx.addIssue({
                code: 'custom',
                path: ['source_url'],
                message: 'source_url is required when type is youtube',
            })
        }
        if (data.file_path) {
            ctx.addIssue({
                code: 'custom',
                path: ['file_path'],
                message: 'file_path is not allowed when type is youtube',
            })
        }
        if (data.file_type) {
            ctx.addIssue({
                code: 'custom',
                path: ['file_type'],
                message: 'file_type is not allowed when type is youtube',
            })
        }
    }

    if (data.type === 'file_upload') {
        if (!data.file_path) {
            ctx.addIssue({
                code: 'custom',
                path: ['file_path'],
                message: 'file_path is required when type is file_upload',
            })
        }
        if (!data.file_type) {
            ctx.addIssue({
                code: 'custom',
                path: ['file_type'],
                message: 'file_type is required when type is file_upload',
            })
        }
        if (data.source_url) {
            ctx.addIssue({
                code: 'custom',
                path: ['source_url'],
                message: 'source_url is not allowed when type is file_upload',
            })
        }
    }
}

export const createMaterialSchema = z.object({
    body: materialBaseSchema.superRefine(materialRefinement),
})

export const updateMaterialSchema = z.object({
    body: materialBaseSchema.partial().superRefine((data, ctx) => {
        if (data.type !== undefined) {
            materialRefinement(data as z.infer<typeof materialBaseSchema>, ctx)
        }
    }),
    params: idSchema.extend({}).shape.params,
})

export type GetMaterialsRequest = TypedRequest<any, any, z.infer<typeof getMaterialsSchema>['query']>
export type CreateMaterialRequest = TypedRequest<z.infer<typeof createMaterialSchema>['body']>
export type UpdateMaterialRequest = TypedRequest<
    z.infer<typeof updateMaterialSchema>['body'],
    z.infer<typeof updateMaterialSchema>['params']
>
export type GetSubjectMaterialsRequest = TypedRequest<
    any,
    z.infer<typeof getSubjectMaterialsSchema>['params'],
    z.infer<typeof getSubjectMaterialsSchema>['query']
>
