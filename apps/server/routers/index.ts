import express from 'express'
import publicRouter from './publicRouter'
import privateRouter from './privateRouter'

const router = express.Router()

router.use('/v1', publicRouter)
router.use('/v1/private', privateRouter)

export default router

