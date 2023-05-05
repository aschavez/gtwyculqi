import { NextFunction, Request, Response } from 'express';

export const auth = () => (req: Request, resp: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    if (bearerToken == process.env.PK_TOKEN_DEFAULT) {
      return next();
    }
    return resp.status(401).json();
  }
  return resp.status(401).json();
}