
import {describe, expect, test} from '@jest/globals';
import { DegreeCardinalDirection } from '../../src/enums/DegreeCardinalDirection';
import { MoveCommand } from '../../src/enums/MoveCommand';
import { Position } from '../../src/models/Position';
import { Rover } from '../../src/models/Rover';
import { RoverControlUtils } from '../../src/utils/RoverControlUtils';

let config: any = undefined;
let roverA: Rover = new Rover('', new Position(0, 0), 0); // ^
let roverB: Rover = new Rover('', new Position(0, 0), 0); // v
let roverC: Rover = new Rover('', new Position(0, 0), 0); // >
let roverD: Rover = new Rover('', new Position(0, 0), 0); // <

describe('RoverControlUtils', () => {

  beforeEach(() => {
    config = Object.freeze({
        'M': 0,
        'L': -90,
        'R': 90
    });
    roverA = new Rover(
      '1',
      new Position(2, 0),
      DegreeCardinalDirection.N
    );
    roverB = new Rover(
      '2',
      new Position(2, 5),
      DegreeCardinalDirection.S
    );
    roverC = new Rover(
      '3',
      new Position(0, 2),
      DegreeCardinalDirection.E
    );
    roverD = new Rover(
      '4',
      new Position(5, 2),
      DegreeCardinalDirection.W
    );

  });

  test('executeCommands', () => {

    RoverControlUtils.executeCommands(roverA, [MoveCommand.L, MoveCommand.M ], config);
    RoverControlUtils.executeCommands(roverB, [MoveCommand.M, MoveCommand.R ], config);
    RoverControlUtils.executeCommands(roverC, [MoveCommand.M ], config);
    RoverControlUtils.executeCommands(roverD, [MoveCommand.L ], config);

    expect(roverA.direction).toBe(DegreeCardinalDirection.W);
    expect(roverA.position.x).toBe(1);
    expect(roverA.position.y).toBe(0);

    expect(roverB.direction).toBe(DegreeCardinalDirection.W);
    expect(roverB.position.x).toBe(2);
    expect(roverB.position.y).toBe(4);

    expect(roverC.direction).toBe(DegreeCardinalDirection.E);
    expect(roverC.position.x).toBe(1);
    expect(roverC.position.y).toBe(2);

    expect(roverD.direction).toBe(DegreeCardinalDirection.S);
    expect(roverD.position.x).toBe(5);
    expect(roverD.position.y).toBe(2);
  });

  test('executeCommand', () => {

    RoverControlUtils.executeCommand(roverA, MoveCommand.L, config);
    RoverControlUtils.executeCommand(roverA, MoveCommand.M, config);
    
    RoverControlUtils.executeCommand(roverB, MoveCommand.M, config);
    RoverControlUtils.executeCommand(roverB, MoveCommand.R, config);
    
    RoverControlUtils.executeCommand(roverC, MoveCommand.M, config);

    RoverControlUtils.executeCommand(roverD, MoveCommand.L, config);

    expect(roverA.direction).toBe(DegreeCardinalDirection.W);
    expect(roverA.position.x).toBe(1);
    expect(roverA.position.y).toBe(0);

    expect(roverB.direction).toBe(DegreeCardinalDirection.W);
    expect(roverB.position.x).toBe(2);
    expect(roverB.position.y).toBe(4);

    expect(roverC.direction).toBe(DegreeCardinalDirection.E);
    expect(roverC.position.x).toBe(1);
    expect(roverC.position.y).toBe(2);

    expect(roverD.direction).toBe(DegreeCardinalDirection.S);
    expect(roverD.position.x).toBe(5);
    expect(roverD.position.y).toBe(2);
  });

  test('calculatePosition', () => {
    let positionA = null;
    let positionB = null;
    let positionC = null;
    let positionD = null;

    positionA = RoverControlUtils.calculatePosition(roverA, MoveCommand.M, config);
    positionB = RoverControlUtils.calculatePosition(roverB, MoveCommand.M, config);
    positionC = RoverControlUtils.calculatePosition(roverC, MoveCommand.M, config);
    positionD = RoverControlUtils.calculatePosition(roverD, MoveCommand.L, config);

    expect(positionA.x).toBe(2);
    expect(positionA.y).toBe(1);
    expect(positionB.x).toBe(2);
    expect(positionB.y).toBe(4);
    expect(positionC.x).toBe(1);
    expect(positionC.y).toBe(2);
    expect(positionD.x).toBe(5);
    expect(positionD.y).toBe(2);
  });

  test('calculateDirection', () => {
    const directionA = RoverControlUtils.calculateDirection(roverA, MoveCommand.M, config);
    const directionB = RoverControlUtils.calculateDirection(roverB, MoveCommand.L, config);
    const directionC = RoverControlUtils.calculateDirection(roverC, MoveCommand.R, config);
    const directionD = RoverControlUtils.calculateDirection(roverD, MoveCommand.L, config);
    expect(directionA).toBe(DegreeCardinalDirection.N);
    expect(directionB).toBe( DegreeCardinalDirection.E);
    expect(directionC).toBe( DegreeCardinalDirection.S);
    expect(directionD).toBe( DegreeCardinalDirection.S);
  });

});
