import { Request, Response, NextFunction } from 'express'

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  next()
}

export default authenticateUser

