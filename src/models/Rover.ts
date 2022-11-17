import { Position } from "./Position";

export class Rover {
    constructor(
        public id: string | null,
        public position: Position,
        public direction: number
    ) { }
}