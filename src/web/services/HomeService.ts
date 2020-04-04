import { IHomeContent } from "../interfaces/IHomeContent";
import { getManager } from "typeorm";
import { CharacterSnapshot } from "../../entities/goldwatch/CharacterSnapshot";
import { IConfiguration } from "../../app/interfaces/IConfiguration";

export class HomeService {

    private readonly config: IConfiguration;
    private readonly version: string;

    constructor() {
        this.config = require("../../config.json");
        this.version = require("../../package.json").version;
    }

    public async renderedPage(): Promise<IHomeContent> {
        const characters: CharacterSnapshot[] = await getManager("goldwatchDB")
            .createQueryBuilder(CharacterSnapshot, "characterSnapShots")
            .orderBy("snapshottime", "DESC")
            .limit(this.config.website.homePageSnapShots)
            .getMany();
        return Promise.resolve({ viewSnapShots: this.config.website.homePageSnapShots, version: this.version, players: characters });
    }
}
