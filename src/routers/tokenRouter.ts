import express, { Router, Request, Response } from 'express';
import { auth } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { CardSchema } from '../schemas/cardSchema';
import { TokenSchema } from '../schemas/tokenSchema';
import { signInToken, validateToken } from '../services/tokenService';
import { Card, Token } from '../types';

const router: Router = express.Router();

router.post('/', [auth(), validate(CardSchema)], (req: Request, res: Response) => {
  const cardData: Card = req.body;
  signInToken(cardData, res);
});

router.post('/validate', [auth(), validate(TokenSchema)], (req: Request, res: Response) => {
  const tokenData: Token = req.body;
  validateToken(tokenData, res);
});

export default router;