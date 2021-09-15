import { Game } from "./game";

export interface Tournament {
    id: number | any;
    name: string | any;
    active: boolean;
    games: Game[];
}