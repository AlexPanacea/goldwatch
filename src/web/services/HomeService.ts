import { IHomeContent } from "../interfaces/IHomeContent";
import { getManager } from "typeorm";
import { CharacterSnapshot } from "../../entities/goldwatch/CharacterSnapshot";

export class HomeService {
    public async renderedPage(): Promise<IHomeContent> {
        const characters: CharacterSnapshot[] = await getManager("goldwatchDB")
            .createQueryBuilder(CharacterSnapshot, "characterSnapShots")
            .orderBy("snapshottime", "DESC")
            .groupBy("name")
            .getMany();
        console.log(characters);
        return Promise.resolve({players: characters });
    }
}
