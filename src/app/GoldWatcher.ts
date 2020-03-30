import { IConfiguration } from "./interfaces/IConfiguration";
import { getManager } from "typeorm";
import { Characters } from "../entities/cmangos/Characters";
import { CharacterSnapshot } from "../entities/goldwatch/CharacterSnapshot";

export class GoldWatcher {

    public readonly config: IConfiguration;

    private readonly saveInterval: number;

    private readonly MS_IN_SECOND: number = 1000;
    private readonly SECONDS_IN_MIN: number = 60;

    constructor(
        config: IConfiguration
    ) {
        this.config = config;
        this.saveInterval = config.mangosSaveInterval * this.SECONDS_IN_MIN * this.MS_IN_SECOND;
        console.log("GoldWatcher service is running");

        setInterval((() => { this.snapShotPlayers(this.config); }), this.saveInterval);
        // ToDo: Fix this, it's not best-practice to guess it takes 1 second.
        setTimeout((() => { this.snapShotPlayers(this.config); }), this.MS_IN_SECOND);
    }

    /**
     * Method runs based on configured interval.
     * This method load data from the mangosdatabase and analyzes it.
     * After analyzing it will store it's data into the SQLite DB.
     */
    private snapShotPlayers(config: IConfiguration) {
        Characters.findActiveWithinTime(config.mangosSaveInterval * this.SECONDS_IN_MIN)
        .then((characters) => {
                try {
                    characters.forEach(character => {
                        const saveCharSnapshot:
                            CharacterSnapshot = new CharacterSnapshot(
                                character.guid,
                                character.name,
                                character.money,
                                character.totaltime);
                        getManager("goldwatchDB").save(saveCharSnapshot);
                    });
                    console.log(`Made ${characters.length} player snapshots.`);
                } catch (e) {
                    console.error(`Failed reading players: ${e}`);
                }
            });
    }
}
