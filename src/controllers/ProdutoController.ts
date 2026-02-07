import type { Request, Response } from 'express';
import type ProdutoService from '../services/ProdutoService.js';

export default class ProdutoController {
  private produtoService: ProdutoService;

  constructor(produtoService: ProdutoService) {
    this.produtoService = produtoService;
  }

  // CREATE
  public create = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const produto = await this.produtoService.create(body);

      res.status(201).json({
        status: 'success',
        data: produto,
      });
    } catch (error: any) {
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Não foi possível criar o produto',
      });
    }
  };

  // READ
  public getAllProdutos = async (req: Request, res: Response) => {
    try {
      const produtos = await this.produtoService.getAllProdutos();

      res.status(200).json({
        status: 'success',
        data: produtos,
      });
    } catch (error: any) {
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Não foi possível obter a lista de produtos',
      });
    }
  };

  // UPDATE
  public update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const produto = await this.produtoService.updateProduto(
        id as string,
        body,
      );

      res.status(200).json({
        status: 'success',
        data: produto,
      });
    } catch (error: any) {
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Não foi possível atualizar o produto',
      });
    }
  };

  // DELETE
  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await this.produtoService.deleteProduto(id as string);

      res.status(200).json({
        status: 'success',
      });
    } catch (error: any) {
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Não foi possível deletar o produto',
      });
    }
  };
}
