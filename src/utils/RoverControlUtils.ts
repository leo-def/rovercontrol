import { DegreeCardinalDirection } from "../enums/DegreeCardinalDirection";
import { MoveCommand } from "../enums/MoveCommand";
import { Position } from "../models/Position";
import { Rover } from "../models/Rover";
import { AxisDegreeUtils } from "./AxisDegreeUtils";

export class RoverControlUtils {
    static executeCommands(rover: Rover, commands: Array<MoveCommand>, config: any) {
        commands.forEach(command => RoverControlUtils.executeCommand(rover, command, config));
        return rover;
    }
    static executeCommand(rover: Rover, command: MoveCommand, config: any) {
        rover.position = RoverControlUtils.calculatePosition(rover, command, config)
        rover.direction = RoverControlUtils.calculateDirection(rover, command, config);
        return rover;
    }

    static calculatePosition(rover: Rover, command: MoveCommand, config: any): Position {
        const position = new Position(rover.position.x, rover.position.y);
        if (command !== MoveCommand.M) {
            return position;
        }
        const direction = rover.direction;
        const value = 1;
        position.x += AxisDegreeUtils.calculateAxis(value, direction, DegreeCardinalDirection.E);
        position.y += AxisDegreeUtils.calculateAxis(value, direction, DegreeCardinalDirection.N);
        return position;
    }

    static calculateDirection(rover: Rover, command: MoveCommand, config: any): number {
        let direction = rover.direction;
        if (command === MoveCommand.M) {
            return direction;
        }
        const turn = config[MoveCommand[command]] || 0;
        direction = AxisDegreeUtils.calcDegree(direction, turn);
        return direction;
    }

}