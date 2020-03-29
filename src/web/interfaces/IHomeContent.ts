import { CharacterSnapshot } from "../../entities/goldwatch/CharacterSnapshot";

export interface IHomeContent {
    homeTitle: string;
    about: string;
    players: CharacterSnapshot[];
}
