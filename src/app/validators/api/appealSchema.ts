import { z } from 'zod'

import { paginationSchema } from './commonSchema'
import { AppealStatus } from '~/app/models/AppealModel'
import { TypedRequest } from '~/types/request'

export const createAppealSchema = z.object({
    body: z.object({
        report_id: z.coerce.number().nullable().optional(),
        content: z.string(),
    }),
})

export const getAppealSchema = z.object({
    query: paginationSchema.shape.query.extend({
        status: z.enum([AppealStatus.PENDING, AppealStatus.APPROVED, AppealStatus.REJECTED]).optional(),
    }),
})

export const updateAppealStatusSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
    body: z.object({
        status: z.enum([AppealStatus.PENDING, AppealStatus.APPROVED, AppealStatus.REJECTED]),
    }),
})

export const createPublicAppealSchema = z.object({
    body: z.object({
        email: z.string().email('Email không hợp lệ'),
        content: z.string().min(10, 'Nội dung kháng cáo phải ít nhất 10 ký tự'),
    }),
})

export type CreateAppealRequest = TypedRequest<z.infer<typeof createAppealSchema>['body']>
export type CreatePublicAppealRequest = TypedRequest<z.infer<typeof createPublicAppealSchema>['body']>
export type GetAppealRequest = TypedRequest<any, any, z.infer<typeof getAppealSchema>['query']>
export type UpdateAppealStatusRequest = TypedRequest<
    z.infer<typeof updateAppealStatusSchema>['body'],
    Record<string, string>
>
