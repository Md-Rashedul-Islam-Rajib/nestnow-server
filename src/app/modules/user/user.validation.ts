import { z } from 'zod';

export const userCreationSchema = z.object({
  name: z.string().min(2).max(20),
  email: z.string().email(),
  phone: z.string(),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Password must be at least 6 characters long!' })
    .max(20, { message: 'Password cannot be more than 20 characters!' }),
  role: z.enum(['landlord','tenant', 'admin']),
  isBlocked: z.boolean().optional().default(false),
});
