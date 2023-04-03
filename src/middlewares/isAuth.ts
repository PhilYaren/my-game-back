import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';
import { User } from '../../types';

declare module 'express-session' {
  interface Session {
    user: User;
  }
}

function isAuth(req: Request<Session>, res: Response, next: NextFunction) {
  req.session?.user.id;
}

export default isAuth;
