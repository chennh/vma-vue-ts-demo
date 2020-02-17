import routes from './routes'
import types from './types'
import { isTypesRouter } from '@/utils'

export const isRouter = (routerName: string | undefined) => isTypesRouter(routerName, types)

export default routes
