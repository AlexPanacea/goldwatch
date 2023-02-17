import { IHomeContent } from "../interfaces/IHomeContent.js";
import { getManager } from "typeorm";
import { CharacterSnapshot } from "../../entities/goldwatch/CharacterSnapshot.js";
import { IConfiguration, IWebsiteSetting } from "../../app/interfaces/IConfiguration.js";
// import { version as jsonVersion} from '../../../package.json' assert { type: "json" };
// import { website } from '../../config.json' assert { type: "json" } ;
// import someObject from './somefile.json'

export class HomeService {

	private readonly website: IWebsiteSetting;
	private readonly twentyFive: number;
	private TWEENTYFUOIVE = 25;
	// private readonly version: string;

	constructor() {
		// this.website = website;
		// this.version = jsonVersion;
		this.twentyFive = this.TWEENTYFUOIVE;
	}

	public async renderedPage(): Promise<IHomeContent> {
		const characters: CharacterSnapshot[] = await getManager("goldwatchDB")
			.createQueryBuilder(CharacterSnapshot, "characterSnapShots")
			.orderBy("snapshottime", "DESC")
			.limit(this.twentyFive)
			.getMany();
		return Promise.resolve({ viewSnapShots: this.twentyFive, version: "1", players: characters });
	}
}
