import { IConfiguration } from "../interfaces/IConfiguration";

export class App {
    constructor(
        config: IConfiguration
    ) {
        console.log(`App is loaded with config: ${JSON.stringify(config)}.`);
    }
}
