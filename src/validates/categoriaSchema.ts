import z from 'zod';

export const categoriaSchema = z.object({
  nome: z
    .string()
    .min(2, 'O nome da categoria deve ter no mínimo 2 caracteres'),

  descricao: z
    .string()
    .max(255, 'A descrição da categoria deve ter no máximo 255 caracteres')
    .optional(),
});
