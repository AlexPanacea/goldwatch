import { IConfiguration } from "./interfaces/IConfiguration";
import { getManager } from "typeorm";
import { CharacterSnapshot } from "../entities/goldwatch/CharacterSnapshot";
import { Characters } from "../entities/cmangos/Characters";

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
        setTimeout((async () => {
            await this.snapShotPlayers(this.config);
            console.log('Task is done.');
            this.tryout();
        }), this.MS_IN_SECOND);
    }

    /**
     * Method runs based on configured interval.
     * This method load data from the mangosdatabase and analyzes it.
     * After analyzing it will store it's data into the SQLite DB.
     */
    private snapShotPlayers(config: IConfiguration): Promise<void> {
        return Characters.findActiveWithinTime(config.mangosSaveInterval * this.SECONDS_IN_MIN)
            .then((characters) => {
                try {
                    characters.forEach(character => {
                        getManager("goldwatchDB").save(
                            new CharacterSnapshot(
                                character.guid,
                                character.name,
                                character.level,
                                character.money,
                                character.totaltime
                            )
                        );
                    });
                    console.log(`Made ${characters.length} player snapshots.`);
                } catch (e) {
                    console.error(`Failed reading players: ${e}`);
                    return Promise.reject(e);
                }
            });
    }

    private indexBalanceChanges() {
        // Method will do:
            // Select the latest snapshots
                // Limit by x amount of snapshot for each player
            // Group the result.
            // See change from begin till end/
            // Save that data back to the SQLite DB.
    }
}
