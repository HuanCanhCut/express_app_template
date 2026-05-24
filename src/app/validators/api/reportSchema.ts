import { z } from 'zod'

import { paginationSchema } from './commonSchema'
import { ReportStatus, ReportType } from '~/app/models/ReportModel'
import { TypedRequest } from '~/types/request'

export const createReportSchema = z.object({
    body: z.object({
        type: z.enum([ReportType.MESSAGE, ReportType.TOPIC, ReportType.COMMENT, ReportType.ASSIGNMENT_DOCUMENT]),
        description: z.string(),
        content: z.string(),
        target_id: z.coerce.number(),
    }),
})

export const getReportSchema = z.object({
    query: paginationSchema.shape.query.extend({
        type: z
            .enum([ReportType.MESSAGE, ReportType.TOPIC, ReportType.COMMENT, ReportType.ASSIGNMENT_DOCUMENT])
            .optional(),
        status: z.enum([ReportStatus.PENDING, ReportStatus.RESOLVED, ReportStatus.REJECTED]).optional(),
    }),
})

export type CreateReportRequest = TypedRequest<z.infer<typeof createReportSchema>['body']>
export const updateReportStatusSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
    body: z.object({
        status: z.enum([ReportStatus.PENDING, ReportStatus.RESOLVED, ReportStatus.REJECTED]),
    }),
})

export type UpdateReportStatusRequest = TypedRequest<
    z.infer<typeof updateReportStatusSchema>['body'],
    z.infer<typeof updateReportStatusSchema>['params']
>
export type GetReportRequest = TypedRequest<any, any, z.infer<typeof getReportSchema>['query']>
