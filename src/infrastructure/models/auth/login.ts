import { z } from 'zod';
import type { Profile } from './profile';

export const baseUserEmailValidation = z.object({
    username: z
        .string()
        .min(1, 'Username / Email Cant Be Empty')
        .max(255, 'Username / Email Maximum 255 Characters')
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
