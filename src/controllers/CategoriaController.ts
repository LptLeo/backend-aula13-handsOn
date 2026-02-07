import type { Request, Response } from 'express';
import type CategoriaService from '../services/CategoriaService.js';

export default class CategoriaController {
  private categoriaService: CategoriaService;

  constructor(categoriaService: CategoriaService) {
    this.categoriaService = categoriaService;
  }

  // CREATE
  public create = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const categoria = await this.categoriaService.create(body);

      res.status(201).json(categoria);
    } catch (error: any) {
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Não foi possível criar a categoria.',
      });
    }
  };

  // READ
  public getAllCategorias = async (req: Request, res: Response) => {
    try {
      const categorias = await this.categoriaService.getAllCategorias();

      res.status(200).json(categorias);
    } catch (error: any) {
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Não foi possível obter as categorias.',
      });
    }
  };

  // UPDATE
  public update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const categoria = await this.categoriaService.updateCategoria(
        id as string,
        body,
      );
      res.status(200).json(categoria);
    } catch (error: any) {
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Não foi possível atualizar a categoria.',
      });
    }
  };

  // DELETE
  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.categoriaService.deleteCategoria(id as string);
      res.status(200).json({
        status: 'success',
        message: `Categoria de id: ${id} deletada com sucesso.`,
      });
    } catch (error: any) {
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Não foi possível deletar a categoria.',
      });
    }
  };
}
