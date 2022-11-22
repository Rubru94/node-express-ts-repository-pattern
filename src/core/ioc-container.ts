import { SubscriptionRepositoryMySQL } from '@subscription/repositories/subscription.repository.mysql';
import { SubscriptionService } from '@subscription/services/subscription.service';
import { TestService } from '@test/services/test.service';
import { createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express/lib/scope-per-request';
import { AwilixContainer } from 'awilix/lib/container';
import { asClass } from 'awilix/lib/resolvers';
import { Application } from 'express';

export class IoCContainer {
    private value: AwilixContainer;

    constructor(app: Application) {
        this.value = createContainer({
            injectionMode: 'CLASSIC'
        });
        this.value.register({
            /**
             * @repositories
             */
            subscriptionRepository: asClass(SubscriptionRepositoryMySQL).scoped(),

            /**
             * @services
             */
            subscriptionService: asClass(SubscriptionService).scoped(),
            testService: asClass(TestService).scoped()
        });
        app.use(scopePerRequest(this.value));
    }
}
