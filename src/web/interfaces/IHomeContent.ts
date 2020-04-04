import { CharacterSnapshot } from "../../entities/goldwatch/CharacterSnapshot";

export interface IHomeContent {
    version: string;
    players: CharacterSnapshot[];
}
