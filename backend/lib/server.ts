import cors from 'cors';
import express, { Request, Response } from 'express';
import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './services/user/routes.config';
import { CountryRoutes } from './services/covid19/routes.config';

const PORT = process.env.APP_PORT || 3200;

const app = express();
const routes: Array<CommonRoutesConfig> = [];

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Server running at http://localhost:${PORT}`);
});

routes.push(new UsersRoutes(app));
routes.push(new CountryRoutes(app));



app.listen(PORT, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    console.log(`Routes configured for ${route.getName}`);
  });
});

export default app;
