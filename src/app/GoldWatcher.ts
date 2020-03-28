import { IConfiguration } from "./interfaces/IConfiguration";

export class GoldWatcher {

    public readonly config: IConfiguration;

    private readonly MS_IN_SECOND = 1000;
    private readonly SECONDS_IN_MIN = 60;

    constructor(
        config: IConfiguration
    ) {
        this.config = config;
        console.log("GoldWatcher service is loaded with config:");
        console.log(`\tmangosSaveInterval: ${config.mangosSaveInterval}`);
        console.log(`\tsqliteLocation: ${config.sqliteLocation}`);
        console.log(`\twebsite: ${config.website}`);

        setInterval(this.doCheck, this.config.mangosSaveInterval * this.SECONDS_IN_MIN * this.MS_IN_SECOND);
        // ToDo: Fix this, it's not best-practice to guess it takes 1 second.
        setTimeout(this.doCheck, this.MS_IN_SECOND);
    }

    /**
     * Method runs based on configured interval.
     * This method load data from the mangosdatabase and analyzes it.
     * After analyzing it will store it's data into the SQLite DB.
     */
    private doCheck() {

        console.log("I did my check.");
    }
}
