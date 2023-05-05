import { z } from 'zod';
import { CardSchema } from './schemas/cardSchema';
import { TokenSchema } from '../schemas/tokenSchema';

export type Card = z.infer<typeof CardSchema>;
export type Token = z.infer<typeof TokenSchema>;
export type CardResponse = Omit<Card, 'cvv'>