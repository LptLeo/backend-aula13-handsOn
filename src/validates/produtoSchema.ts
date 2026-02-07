import z from 'zod';

export const produtoSchema = z.object({
  nome: z.string().min(2, 'O nome do produto deve ter no mínimo 2 caracteres'),

  descricao: z.string().optional(),

  preco: z.coerce.number().positive('O preço deve ser maior que zero'),

  estoque: z.coerce
    .number()
    .int('O estoque deve ser um número inteiro')
    .min(0, 'O estoque não pode ser negativo'),

  categoria: z.uuid('ID de categoria inválido'),
});
