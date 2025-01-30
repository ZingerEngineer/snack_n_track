import express from 'express'
import authenticateUser from '../middlewares/authenticateUser'
const privateRouter = express.Router()

privateRouter.use(authenticateUser)
privateRouter.get('/', (_, res) => {
  res.json({ message: 'Hello private World' })
})

export default privateRouter

