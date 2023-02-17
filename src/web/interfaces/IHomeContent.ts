import { CharacterSnapshot } from "../../entities/goldwatch/CharacterSnapshot.js";

export interface IHomeContent {
	version: string;
	viewSnapShots: number;
	players: CharacterSnapshot[];
}
