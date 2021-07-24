import { Game } from "./game";

export interface Tournament {
    id: any;
    name: string;
    active: boolean;
    games: Game[];
}