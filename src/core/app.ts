import express, { Application } from 'express';
import ContainerDI from '@core/container-di';
import { TestService } from '@test/services/test.service';

class App {
    private app: Application;

    async start(): Promise<Application> {
        this.app = express();

        this.app.get('/', (req, res) => {
            res.send('Running ...');
        });

        const testService = ContainerDI.get().resolve<TestService>('testService');
        console.log(testService.get());

        return this.app;
    }
}

export default new App();
