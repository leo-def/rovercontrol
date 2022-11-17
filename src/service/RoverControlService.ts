import { DegreeCommandService } from "./DegreeCommandService"
import { MoveCommand } from "../enums/MoveCommand";
import { Rover } from "../models/Rover";
import { RoverRepository } from "../repository/RoverRepository";
import { RoverControlUtils } from "../utils/RoverControlUtils";
import { Area } from "../models/Area";

export class RoverControlService {
    private static instance = new RoverControlService();

    static getInstance(): RoverControlService {
        return RoverControlService.instance;
    }
    private constructor() {
    }

    degreeCommandService: DegreeCommandService = DegreeCommandService.getInstance();
    roverRepository: RoverRepository = RoverRepository.getInstance();


    setArea(area: Area) {
        return this.roverRepository.setArea(area);
    }

    addRover(rover: Rover, commands?: Array<MoveCommand>) {
        if (commands) {
            const config = this.degreeCommandService.getConfig();
            RoverControlUtils.executeCommands(rover, commands, config)
        }
        return this.roverRepository.addRover(rover)
    }

    getRovers() {
        return this.roverRepository.getRoverList();
    }
}