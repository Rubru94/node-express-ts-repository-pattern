import { config } from 'dotenv-flow';
import http from 'http';
import { addAliases } from 'module-alias';

config({ path: `${__dirname}/../environments` });
addAliases({
    '@core': `${__dirname}/core`,
    '@utils': `${__dirname}/utils`,
    '@root': `${__dirname}`,
    '@test': `${__dirname}/test`
});
import App from '@core/app';

const host = process.env.APP_HOST;
const port = process.env.APP_PORT;

async function bootstrap(): Promise<void> {
    try {
        const app = await App.start();
        const server: http.Server = http.createServer(app);
        if (process.env.DOCKER)
            server.listen(port, () => {
                console.info(`Server listening on port: ${port}`);
            });
        else
            server.listen(port, +host, () => {
                console.info(`Server listening on host: ${host} and port ${port}`);
            });
    } catch (error) {
        console.error(error);
    }
}

bootstrap();
