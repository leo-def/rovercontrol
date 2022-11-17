import { Area } from "../models/Area";
import { Rover } from "../models/Rover";

export class RoverRepository {

    private static instance: RoverRepository = new RoverRepository();

    static getInstance() {
        return RoverRepository.instance;
    }


    static reset() {
        return RoverRepository.instance = new RoverRepository();;
    }

    private rovers: Array<Rover> = [];

    private area?: Area;

    private constructor() { }

    getCurrId(): string {
        return (this.rovers.length + 1).toString();
    }

    addRover(rover: Rover): Rover {
        rover.id = this.getCurrId();
        this.rovers.push(rover);
        return rover;
    }

    setArea(area: Area): Area {
        return this.area = area;
    }

    getRoverList() {
        return this.rovers;
    }
}
