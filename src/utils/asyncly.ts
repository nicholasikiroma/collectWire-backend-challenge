import { RequestHandler, Response, Request, NextFunction } from 'express';

function Asyncly(fn: RequestHandler) {
  const handler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
  return handler;
}

export default Asyncly;
