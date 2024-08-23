import { z } from 'zod';
import type { Profile } from './profile';

export const baseUserEmailValidation = z.object({
    email: z
        .string()
        .min(1, 'Email Cant Be Empty')
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Email is not valid'
        )
        .max(255, 'Email Maximum 255 Characters')
});

export const userLoginValidation = z
    .object({
        password: z.string().min(1, 'Password Cant Be Empty')
    })
    .merge(baseUserEmailValidation);

export type UserLoginForm = z.infer<typeof userLoginValidation>;

export namespace LoginType {
    export interface Request extends UserLoginForm {}
    export interface Response extends Profile.Response {}
}
