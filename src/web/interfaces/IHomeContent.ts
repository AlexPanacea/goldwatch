import { CharacterSnapshot } from "../../entities/goldwatch/CharacterSnapshot";

export interface IHomeContent {
	version: string;
	viewSnapShots: number;
	players: CharacterSnapshot[];
}
