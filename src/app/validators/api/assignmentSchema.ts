import { z } from 'zod'

import { idSchema, paginationSchema } from './commonSchema'
import { TypedRequest } from '~/types/request'

export const getAssignmentsSchema = z.object({
    query: paginationSchema.shape.query.extend({
        user_id: z.coerce.number().int().positive().transform(String).optional(),
        type: z.enum(['assignment', 'essay', 'project', 'personal', 'practice']).optional(),
        q: z.string().optional(),
    }),
})

export const getSubjectAssignmentsSchema = z.object({
    params: idSchema.shape.params,
    query: paginationSchema.shape.query.extend({
        type: z.enum(['all', 'pending', 'approved', 'rejected']).optional(),
        user_id: z.coerce.number().int().positive().optional().transform(String),
    }),
})

export const createAssignmentSchema = z.object({
    body: z.object({
        subject_id: z.coerce.number().int().positive(),
        title: z.string().trim().min(1),
        type: z.enum(['assignment', 'essay', 'project', 'personal', 'practice']),
        description: z.string(),
        is_group: z.boolean().default(false),
        file_path: z.url(),
        file_type: z.string(),
    }),
})

export const updateAssignmentSchema = z.object({
    params: idSchema.extend({}).shape.params,
    body: createAssignmentSchema.shape.body.partial(),
})

export type GetAssignmentsRequest = TypedRequest<any, any, z.infer<typeof getAssignmentsSchema>['query']>
export type GetSubjectAssignmentsRequest = TypedRequest<
    any,
    z.infer<typeof getSubjectAssignmentsSchema>['params'],
    z.infer<typeof getSubjectAssignmentsSchema>['query']
>
export type CreateAssignmentRequest = TypedRequest<z.infer<typeof createAssignmentSchema>['body']>
export type UpdateAssignmentRequest = TypedRequest<
    z.infer<typeof updateAssignmentSchema>['body'],
    z.infer<typeof idSchema>['params']
>
