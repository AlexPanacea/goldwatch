import { IConfiguration } from "./interfaces/IConfiguration";

export class GoldWatcher {
    constructor(
        config: IConfiguration
    ) {
        console.log(`GoldWatcher service is loaded with config: ${JSON.stringify(config)}.`);
    }
}
