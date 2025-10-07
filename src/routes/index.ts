import { Express } from 'express'

import authRoute from './auth'
import setUserContextMiddleware from '~/app/middlewares/userContext'
import verifyToken from '~/app/middlewares/verifyToken'

const route = (app: Express) => {
    app.use('/api/auth', authRoute)

    app.use(verifyToken, setUserContextMiddleware)
}

export default route
