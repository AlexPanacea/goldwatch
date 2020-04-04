import { IHomeContent } from "../interfaces/IHomeContent";
import { getManager } from "typeorm";
import { CharacterSnapshot } from "../../entities/goldwatch/CharacterSnapshot";

export class HomeService {

    private version: string;

    constructor() {
        this.version = require("../../../package.json").version;
        console.log(this.version);
    }

    public async renderedPage(): Promise<IHomeContent> {
        const characters: CharacterSnapshot[] = await getManager("goldwatchDB")
            .createQueryBuilder(CharacterSnapshot, "characterSnapShots")
            .orderBy("snapshottime", "DESC")
            // tslint:disable-next-line: no-magic-numbers
            .limit(10)
            .getMany();
        return Promise.resolve({ version: this.version, players: characters });
    }
}
