import { Router } from 'express';
import categoriaRoutes from './categoriaRoutes.js';
import produtoRoutes from './produtoRoutes.js';

const routes = Router();

routes.use('/categoria', categoriaRoutes);
routes.use('/produto', produtoRoutes);

export default routes;
