import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../swagger.json'; 
import imovelRoutes from './routes/imovelRoutes';
import locacaoRoutes from './routes/locacaoRoutes';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/imoveis', imovelRoutes); 
app.use('/api/locacoes', locacaoRoutes); 

export { app };
