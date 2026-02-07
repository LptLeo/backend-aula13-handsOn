import { Router } from 'express';
import CategoriaService from '../services/CategoriaService.js';
import CategoriaController from '../controllers/CategoriaController.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { categoriaSchema } from '../validates/categoriaSchema.js';

const categoriaRoutes = Router();
const categoriaService = new CategoriaService();
const categoriaController = new CategoriaController(categoriaService);

categoriaRoutes.post('/', validate(categoriaSchema), (req, res) =>
  categoriaController.create(req, res),
);
categoriaRoutes.get('/', (req, res) =>
  categoriaController.getAllCategorias(req, res),
);
categoriaRoutes.put('/:id', validate(categoriaSchema), (req, res) =>
  categoriaController.update(req, res),
);
categoriaRoutes.delete('/:id', (req, res) =>
  categoriaController.delete(req, res),
);

export default categoriaRoutes;
