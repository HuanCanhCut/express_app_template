import { Queue } from 'bullmq'

import { connection } from '~/config/redis'
import { QueueEnum } from '~/enum/queue'

const mailQueue = new Queue(QueueEnum.MAIL, {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 5000,
        },
        removeOnComplete: true,
        removeOnFail: 5000,
    },
})

interface MailData {
    email: string
    code?: number
    reason?: string
    fullName?: string
    content?: string
    type: 'activate_account' | 'reset_password' | 'block_user' | 'unblock_user'
}

const addMailJob = async (data: MailData): Promise<void> => {
    switch (data.type) {
        case 'activate_account':
            await mailQueue.add(QueueEnum.SEND_VERIFICATION_CODE, data)
            break
        case 'reset_password':
            await mailQueue.add(QueueEnum.SEND_RESET_PASSWORD_CODE, data)
            break
        case 'block_user':
            await mailQueue.add(QueueEnum.SEND_BLOCK_USER, data)
            break
        case 'unblock_user':
            await mailQueue.add(QueueEnum.SEND_UNBLOCK_USER, data)
            break
        default:
            throw new Error('Invalid type')
    }
}

export { addMailJob, MailData, mailQueue }
