
import { describe, expect, test } from '@jest/globals';
import { DegreeCardinalDirection } from '../../src/enums/DegreeCardinalDirection';
import { Position } from '../../src/models/Position';
import { Rover } from '../../src/models/Rover';
import { RoverRepository } from '../../src/repository/RoverRepository';

let roverA: Rover = new Rover('', new Position(0, 0), 0); // ^
let roverB: Rover = new Rover('', new Position(0, 0), 0); // v
let roverC: Rover = new Rover('', new Position(0, 0), 0); // >
let roverD: Rover = new Rover('', new Position(0, 0), 0); // <

describe('RoverRepository', () => {

  beforeEach(() => {
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

  test('getCurrId', () => {
    let roverRepository = RoverRepository.reset();
    roverRepository.addRover(roverA);
    roverRepository.addRover(roverB);
    expect(roverA.id).toBeTruthy();
    expect(roverB.id).toBeTruthy();
    expect(roverB.id).not.toEqual(roverA.id);
    expect(roverB.id).not.toEqual(roverRepository.getCurrId());
  });

  test('addRover', () => {
    let roverRepository = RoverRepository.reset();
    roverRepository.addRover(roverA);
    roverRepository.addRover(roverB);
    const rovers = roverRepository.getRoverList();
    expect(rovers).toEqual(expect.arrayContaining([roverA, roverB]));
    expect(rovers).toHaveLength(2);
  });

});
