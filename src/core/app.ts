import DB from '@core/database/mysql.persistence';
import { IoCContainer } from '@core/ioc-container';
import handleError from '@core/middlewares/error-handler.middleware';
import { all } from '@core/middlewares/router.middleware';
import { loadControllers } from 'awilix-express/lib/controller';
import { json, text, urlencoded } from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response, static as expressStatic } from 'express';
import helmet, { contentSecurityPolicy } from 'helmet';

class App {
    private app: Application;
    private container: IoCContainer;

    async start(): Promise<Application> {
        this.app = express();
        this.build();
        this.config();
        this.app.all('*', all);
        this.capture();
        DB.connect();
        return this.app;
    }

    private build(): void {
        this.container = new IoCContainer(this.app);
        this.app.use(loadControllers('../**/controllers/*.ts', { cwd: '@root' }));
    }

    private config(): void {
        this.app.use(compression());
        this.app.use(json({ limit: '1mb' }));
        this.app.use(text({ type: 'text/html' }));
        this.app.use(helmet());
        let directives: any;
        if (process.env.NODE_ENV === 'dev') {
            directives = {
                defaultSrc: ["'self'"],
                styleSrc: ["'self' 'unsafe-inline'"],
                connectSrc: ["'self'"],
                imgSrc: ["'self' data:"],
                scriptSrc: ["'self' 'unsafe-eval'"],
                fontSrc: ["'self'"]
            };
        } else {
            directives = {
                defaultSrc: ["'self'"]
            };
        }
        this.app.use(
            contentSecurityPolicy({
                directives
            })
        );
        this.app.use(cors());
        this.app.use(urlencoded({ extended: false }));
        this.app.disable('x-powered-by');
        this.app.use('/static', expressStatic(`${__dirname}/static`));
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
