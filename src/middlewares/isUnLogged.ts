import { Request, Response, NextFunction } from 'express';

function isUnLogged(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  next();
}

export default isUnLogged;
