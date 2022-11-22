import { IoCContainer } from '@core/ioc-container';
import handleError from '@core/middlewares/error-handler.middleware';
import { loadControllers } from 'awilix-express/lib/controller';
import express, { Application, NextFunction, Request, Response } from 'express';

class App {
    private app: Application;
    private container: IoCContainer;

    async start(): Promise<Application> {
        this.app = express();
        this.build();
        this.capture();
        return this.app;
    }

    private build(): void {
        this.container = new IoCContainer(this.app);
        this.app.use(loadControllers('../**/controllers/*.ts', { cwd: '@root' }));
    }

    private capture(): void {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept');
            res.header('Access-Control-Expose-Headers', 'Authorization');

            next();
        });
        this.app.use(handleError);
    }
}

export default new App();
