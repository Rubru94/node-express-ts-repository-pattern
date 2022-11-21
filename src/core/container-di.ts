import { createContainer } from 'awilix';
import { AwilixContainer } from 'awilix/lib/container';
import { asClass } from 'awilix/lib/resolvers';
import { TestService } from '@test/services/test.service';

class ContainerDI {
    private container: AwilixContainer;

    constructor() {
        this.container = createContainer();
        this.container.register({
            testService: asClass(TestService).scoped()
        });
    }

    get(): AwilixContainer<TestService> {
        return this.container;
    }
}

export default new ContainerDI();
