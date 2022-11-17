import { DegreeCardinalDirection, getDegreeDirection, getDirectionDegree } from "../enums/DegreeCardinalDirection";
import { getMoveCommandFromString, MoveCommand } from "../enums/MoveCommand";
import { Area } from "../models/Area";
import { Position } from "../models/Position";
import { Rover } from "../models/Rover";
import { RoverControlService } from "../service/RoverControlService";

export class ConsoleController {
    private static instance = new ConsoleController();

    static getInstance(): ConsoleController {
        return ConsoleController.instance;
    }
    private constructor(){
    }

    roverControlService: RoverControlService = RoverControlService.getInstance();

    exec(data: String) {
        const { area, rovers } = this.mapData(data);
        this.roverControlService.setArea(area);
        rovers.forEach( roverData => {
            this.roverControlService.addRover(
                roverData.rover,
                roverData.commands
            )
        });
        const result = this.roverControlService.getRovers();
        this.displayRovers(result);
    }

    displayRovers (rovers: Array<Rover>) {
        rovers.forEach( rover => this.displayRover(rover));
    }

    displayRover (rover: Rover) {
        console.log(`${rover.position.x} ${rover.position.y} ${getDegreeDirection(rover.direction)}`)
    }

    mapData(data: String) {
        const lines = data.split('\n');

        const firstValues = lines[0].trim().split(' ');
        const area = new Area(new Position(0, 0 ), new Position( Number.parseInt(firstValues[0]), Number.parseInt(firstValues[1]) ));
        
        let index = 1;
        let rovers = [];
        let curr = {} as any;
        while (index < lines.length) {
            if((index % 2) !== 0) {
                const [x, y, direction] = lines[index].trim().split(' ');
                const degree = getDirectionDegree(direction);
                const rover = new Rover(
                    null,
                    new Position(Number.parseInt(x), Number.parseInt(y)),
                    degree
                );

                curr.rover = rover;

            } else {
                const commands = lines[index].trim().split('');
                curr.commands = commands.map( commandStr => getMoveCommandFromString(commandStr));
                rovers.push(curr);
                curr = {};

            }
            index++;
        }

        return {
            area,
            rovers
        }

    }
}
