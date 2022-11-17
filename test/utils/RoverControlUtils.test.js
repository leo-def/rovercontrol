"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const DegreeCardinalDirection_1 = require("../../src/enums/DegreeCardinalDirection");
const MoveCommand_1 = require("../../src/enums/MoveCommand");
const Position_1 = require("../../src/models/Position");
const Rover_1 = require("../../src/models/Rover");
const RoverControlUtils_1 = require("../../src/utils/RoverControlUtils");
let config = undefined;
let roverA = new Rover_1.Rover('', new Position_1.Position(0, 0), 0); // ^
let roverB = new Rover_1.Rover('', new Position_1.Position(0, 0), 0); // v
let roverC = new Rover_1.Rover('', new Position_1.Position(0, 0), 0); // >
let roverD = new Rover_1.Rover('', new Position_1.Position(0, 0), 0); // <
(0, globals_1.describe)('RoverControlUtils', () => {
    beforeEach(() => {
        config = Object.freeze({
            'M': 0,
            'L': -90,
            'R': 90
        });
        roverA = new Rover_1.Rover('1', new Position_1.Position(2, 0), DegreeCardinalDirection_1.DegreeCardinalDirection.N);
        roverB = new Rover_1.Rover('2', new Position_1.Position(2, 5), DegreeCardinalDirection_1.DegreeCardinalDirection.S);
        roverC = new Rover_1.Rover('3', new Position_1.Position(0, 2), DegreeCardinalDirection_1.DegreeCardinalDirection.E);
        roverD = new Rover_1.Rover('4', new Position_1.Position(5, 2), DegreeCardinalDirection_1.DegreeCardinalDirection.W);
    });
    (0, globals_1.test)('executeCommands', () => {
        RoverControlUtils_1.RoverControlUtils.executeCommands(roverA, [MoveCommand_1.MoveCommand.L, MoveCommand_1.MoveCommand.M], config);
        RoverControlUtils_1.RoverControlUtils.executeCommands(roverB, [MoveCommand_1.MoveCommand.M, MoveCommand_1.MoveCommand.R], config);
        RoverControlUtils_1.RoverControlUtils.executeCommands(roverC, [MoveCommand_1.MoveCommand.M], config);
        RoverControlUtils_1.RoverControlUtils.executeCommands(roverD, [MoveCommand_1.MoveCommand.L], config);
        (0, globals_1.expect)(roverA.direction).toBe(DegreeCardinalDirection_1.DegreeCardinalDirection.W);
        (0, globals_1.expect)(roverA.position.x).toBe(1);
        (0, globals_1.expect)(roverA.position.y).toBe(0);
        (0, globals_1.expect)(roverB.direction).toBe(DegreeCardinalDirection_1.DegreeCardinalDirection.W);
        (0, globals_1.expect)(roverB.position.x).toBe(2);
        (0, globals_1.expect)(roverB.position.y).toBe(4);
        (0, globals_1.expect)(roverC.direction).toBe(DegreeCardinalDirection_1.DegreeCardinalDirection.E);
        (0, globals_1.expect)(roverC.position.x).toBe(1);
        (0, globals_1.expect)(roverC.position.y).toBe(2);
        (0, globals_1.expect)(roverD.direction).toBe(DegreeCardinalDirection_1.DegreeCardinalDirection.S);
        (0, globals_1.expect)(roverD.position.x).toBe(5);
        (0, globals_1.expect)(roverD.position.y).toBe(2);
    });
    (0, globals_1.test)('executeCommand', () => {
        RoverControlUtils_1.RoverControlUtils.executeCommand(roverA, MoveCommand_1.MoveCommand.L, config);
        RoverControlUtils_1.RoverControlUtils.executeCommand(roverA, MoveCommand_1.MoveCommand.M, config);
        RoverControlUtils_1.RoverControlUtils.executeCommand(roverB, MoveCommand_1.MoveCommand.M, config);
        RoverControlUtils_1.RoverControlUtils.executeCommand(roverB, MoveCommand_1.MoveCommand.R, config);
        RoverControlUtils_1.RoverControlUtils.executeCommand(roverC, MoveCommand_1.MoveCommand.M, config);
        RoverControlUtils_1.RoverControlUtils.executeCommand(roverD, MoveCommand_1.MoveCommand.L, config);
        (0, globals_1.expect)(roverA.direction).toBe(DegreeCardinalDirection_1.DegreeCardinalDirection.W);
        (0, globals_1.expect)(roverA.position.x).toBe(1);
        (0, globals_1.expect)(roverA.position.y).toBe(0);
        (0, globals_1.expect)(roverB.direction).toBe(DegreeCardinalDirection_1.DegreeCardinalDirection.W);
        (0, globals_1.expect)(roverB.position.x).toBe(2);
        (0, globals_1.expect)(roverB.position.y).toBe(4);
        (0, globals_1.expect)(roverC.direction).toBe(DegreeCardinalDirection_1.DegreeCardinalDirection.E);
        (0, globals_1.expect)(roverC.position.x).toBe(1);
        (0, globals_1.expect)(roverC.position.y).toBe(2);
        (0, globals_1.expect)(roverD.direction).toBe(DegreeCardinalDirection_1.DegreeCardinalDirection.S);
        (0, globals_1.expect)(roverD.position.x).toBe(5);
        (0, globals_1.expect)(roverD.position.y).toBe(2);
    });
    (0, globals_1.test)('calculatePosition', () => {
        let positionA = null;
        let positionB = null;
        let positionC = null;
        let positionD = null;
        positionA = RoverControlUtils_1.RoverControlUtils.calculatePosition(roverA, MoveCommand_1.MoveCommand.M, config);
        positionB = RoverControlUtils_1.RoverControlUtils.calculatePosition(roverB, MoveCommand_1.MoveCommand.M, config);
        positionC = RoverControlUtils_1.RoverControlUtils.calculatePosition(roverC, MoveCommand_1.MoveCommand.M, config);
        positionD = RoverControlUtils_1.RoverControlUtils.calculatePosition(roverD, MoveCommand_1.MoveCommand.L, config);
        (0, globals_1.expect)(positionA.x).toBe(2);
        (0, globals_1.expect)(positionA.y).toBe(1);
        (0, globals_1.expect)(positionB.x).toBe(2);
        (0, globals_1.expect)(positionB.y).toBe(4);
        (0, globals_1.expect)(positionC.x).toBe(1);
        (0, globals_1.expect)(positionC.y).toBe(2);
        (0, globals_1.expect)(positionD.x).toBe(5);
        (0, globals_1.expect)(positionD.y).toBe(2);
    });
    (0, globals_1.test)('calculateDirection', () => {
        const directionA = RoverControlUtils_1.RoverControlUtils.calculateDirection(roverA, MoveCommand_1.MoveCommand.M, config);
        const directionB = RoverControlUtils_1.RoverControlUtils.calculateDirection(roverB, MoveCommand_1.MoveCommand.L, config);
        const directionC = RoverControlUtils_1.RoverControlUtils.calculateDirection(roverC, MoveCommand_1.MoveCommand.R, config);
        const directionD = RoverControlUtils_1.RoverControlUtils.calculateDirection(roverD, MoveCommand_1.MoveCommand.L, config);
        (0, globals_1.expect)(directionA).toBe(DegreeCardinalDirection_1.DegreeCardinalDirection.N);
        (0, globals_1.expect)(directionB).toBe(DegreeCardinalDirection_1.DegreeCardinalDirection.E);
        (0, globals_1.expect)(directionC).toBe(DegreeCardinalDirection_1.DegreeCardinalDirection.S);
        (0, globals_1.expect)(directionD).toBe(DegreeCardinalDirection_1.DegreeCardinalDirection.S);
    });
});
