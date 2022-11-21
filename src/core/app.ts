import express, { Application } from 'express';
import { IoCContainer } from '@core/ioc-container';
import { loadControllers } from 'awilix-express/lib/controller';

class App {
    private app: Application;
    private container: IoCContainer;

    async start(): Promise<Application> {
        this.app = express();
        this.build();
        return this.app;
    }

    private build(): void {
        this.container = new IoCContainer(this.app);
        this.app.use(loadControllers('../**/controllers/*.ts', { cwd: '@root' }));
    }
}

export default new App();
