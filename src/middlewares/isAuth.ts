import { Request, Response, NextFunction } from 'express';
import { User } from '../../types';

declare module 'express-session' {
  interface Session {
    user: User;
  }
}

function isAuth(req: Request, res: Response, next: NextFunction) {
  const user = req.session?.user;
  if (user) {
    next();
    return;
  }
  res.status(401).json({ message: 'Unauthorized' });
}

export default isAuth;
