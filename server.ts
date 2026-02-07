import express from 'express';
import { appDataSource } from './src/database/dataSource.js';
import routes from './src/routes/indexRoutes.js';

const app = express();
const PORT = process.env.PORT || 6060;

app.use(express.json());

app.use('/api', routes);

appDataSource
  .initialize()
  .then(() => {
    console.log('Conenctado ao banco de dados mundo_geek_db');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
