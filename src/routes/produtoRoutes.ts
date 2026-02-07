import { Router } from 'express';
import ProdutoService from '../services/ProdutoService.js';
import ProdutoController from '../controllers/ProdutoController.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { produtoSchema } from '../validates/produtoSchema.js';

const produtoRoutes = Router();
const produtoService = new ProdutoService();
const produtoController = new ProdutoController(produtoService);

produtoRoutes.post('/', validate(produtoSchema), (req, res) =>
  produtoController.create(req, res),
);
produtoRoutes.get('/', (req, res) =>
  produtoController.getAllProdutos(req, res),
);
produtoRoutes.put('/:id', validate(produtoSchema), (req, res) =>
  produtoController.update(req, res),
);
produtoRoutes.delete('/:id', (req, res) => produtoController.delete(req, res));

export default produtoRoutes;
