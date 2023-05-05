import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validate = (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      return next();
    } catch(err: any) {
      return res.status(400).json(err.issues);
    }
  }