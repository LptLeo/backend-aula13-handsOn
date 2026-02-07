import type { NextFunction, Request, Response } from 'express';
import z from 'zod';

export const validate = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // .parse compara o objeto recebido (req.body) com o schema passado no argumento
      req.body = schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: 'fail',
          message: 'Erro de validaçãonos dados enviados.',
          errors: error.issues.map((err) => ({
            campo: err.path.join('.'),
            mensagem: err.message,
          })),
        });
      }

      return res
        .status(500)
        .json({ status: 'error', message: 'Erro interno no servidor' });
    }
  };
};
