import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Format tidak valid, silahkan cek lagi input anda" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
