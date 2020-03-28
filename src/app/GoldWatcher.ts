import { IConfiguration } from "./interfaces/IConfiguration";
import { Connection, getConnection, getManager } from "typeorm";
import { Characters } from "../entities/cmangos/Characters";
import { Character } from "../entities/goldwatch/Character";

export class GoldWatcher {

    public readonly config: IConfiguration;

    private readonly cmangosDB: Connection;
    private readonly goldWatchDB: Connection;

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
        getManager("cmangosDB").find(Characters).then((characters) => {
            try {
                characters.forEach(character => {
                    const saveCharSnapshot: Character = new Character();
                    saveCharSnapshot.account = character.account;
                    saveCharSnapshot.guid = character.guid;
                    saveCharSnapshot.money = character.money;
                    saveCharSnapshot.name = character.name;
                    saveCharSnapshot.totaltime = character.totaltime;
                    getManager("goldwatchDB").save(saveCharSnapshot);
                });
                console.log(`Saved ${characters.length} players!`);
            } catch (e) {
                console.error(`Failed reading players: ${e}`);
            }
        });
    }
}
