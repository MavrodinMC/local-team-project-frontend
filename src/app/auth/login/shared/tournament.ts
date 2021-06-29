import { Game } from "./game";

export interface Tournament {
    id: any;
    name: string;
    games: Game[];
}