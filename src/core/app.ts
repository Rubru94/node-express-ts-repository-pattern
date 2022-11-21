import express, { Application } from 'express';

class App {
    private app: Application;

    async start(): Promise<Application> {
        this.app = express();

        this.app.get('/', (req, res) => {
            res.send('Running ...');
        });

        return this.app;
    }
}

export default new App();
