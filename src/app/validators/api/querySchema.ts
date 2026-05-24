import { z } from 'zod'

import { TypedRequest } from '~/types/request'

export const querySchema = z.object({
    query: z.object({
        q: z.string().min(1, 'Query is required'),
    }),
})

export type QuerySchema = TypedRequest<z.infer<typeof querySchema>>['query']
