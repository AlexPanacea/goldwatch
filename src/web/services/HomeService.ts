import { IHomeContent } from "../interfaces/IHomeContent";
import { getManager } from "typeorm";
import { CharacterSnapshot } from "../../entities/goldwatch/CharacterSnapshot";

export class HomeService {
    public async renderedPage(): Promise<IHomeContent> {
        const characters: CharacterSnapshot[] = await getManager("goldwatchDB")
            .createQueryBuilder(CharacterSnapshot, "characterSnapShots")
            .orderBy("totaltime", "DESC")
            .groupBy("name")
            .getMany();
        return Promise.resolve({homeTitle: "Player overview", about: "Hello wrld!", players: characters });
    }
}
