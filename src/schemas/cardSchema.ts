import luhn from 'fast-luhn';
import { z } from 'zod';

const isValidCreditCard = (value: number) => {
  return luhn(value.toString());
};

const isValidYear = (value: string) => {
  const actualYear = new Date().getFullYear();
  return parseInt(value) <= actualYear + 5;
};

export const CardSchema = z.object({
  card_number: z.number().int().refine(isValidCreditCard, "Invalid credit card number"),
  cvv: z.number().positive().int().min(100, "CVV lenght min 3 digits").max(9999, "CVV lenght max 4 digits"),
  expiration_month: z.string().min(1).max(2).regex(/^(0?[1-9]|1[012])$/, "Value must be a valid month"),
  expiration_year: z.string().length(4).regex(/^\d{4}$/, "Value must be a valid year"). refine(isValidYear, "Invalid year"),
  email: z.string().email().min(5).max(100),
});