"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const DegreeCardinalDirection_1 = require("../../src/enums/DegreeCardinalDirection");
const Position_1 = require("../../src/models/Position");
const Rover_1 = require("../../src/models/Rover");
const RoverRepository_1 = require("../../src/repository/RoverRepository");
let roverA = new Rover_1.Rover('', new Position_1.Position(0, 0), 0); // ^
let roverB = new Rover_1.Rover('', new Position_1.Position(0, 0), 0); // v
let roverC = new Rover_1.Rover('', new Position_1.Position(0, 0), 0); // >
let roverD = new Rover_1.Rover('', new Position_1.Position(0, 0), 0); // <
(0, globals_1.describe)('RoverRepository', () => {
    beforeEach(() => {
        roverA = new Rover_1.Rover('1', new Position_1.Position(2, 0), DegreeCardinalDirection_1.DegreeCardinalDirection.N);
        roverB = new Rover_1.Rover('2', new Position_1.Position(2, 5), DegreeCardinalDirection_1.DegreeCardinalDirection.S);
        roverC = new Rover_1.Rover('3', new Position_1.Position(0, 2), DegreeCardinalDirection_1.DegreeCardinalDirection.E);
        roverD = new Rover_1.Rover('4', new Position_1.Position(5, 2), DegreeCardinalDirection_1.DegreeCardinalDirection.W);
    });
    (0, globals_1.test)('getCurrId', () => {
        let roverRepository = RoverRepository_1.RoverRepository.reset();
        roverRepository.addRover(roverA);
        roverRepository.addRover(roverB);
        (0, globals_1.expect)(roverA.id).toBeTruthy();
        (0, globals_1.expect)(roverB.id).toBeTruthy();
        (0, globals_1.expect)(roverB.id).not.toEqual(roverA.id);
        (0, globals_1.expect)(roverB.id).not.toEqual(roverRepository.getCurrId());
    });
    (0, globals_1.test)('addRover', () => {
        let roverRepository = RoverRepository_1.RoverRepository.reset();
        roverRepository.addRover(roverA);
        roverRepository.addRover(roverB);
        const rovers = roverRepository.getRoverList();
        (0, globals_1.expect)(rovers).toEqual(globals_1.expect.arrayContaining([roverA, roverB]));
        (0, globals_1.expect)(rovers).toHaveLength(2);
    });
});
