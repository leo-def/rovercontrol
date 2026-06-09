# RoverControl - Technical Specification

> TypeScript Mars rover simulator implementing command parsing and degree-based movement.
> Demonstrates OOP patterns, singleton services, and CLI-driven input processing.

## Executive Summary

RoverControl is a **TypeScript + Node.js CLI** application simulating NASA-style Mars rover commands. Given a grid size and initial rover positions, it processes sequences of `L` (turn left), `R` (turn right), and `M` (move forward) commands using degree-based direction math. Results are written to stdout. It uses a singleton pattern throughout and separates concerns across models, services, repositories, utilities, and a console controller.

---

## 1. Problem Statement

### Context
Classic software engineering kata: given a plateau grid and one or more rovers with initial positions and command sequences, simulate the final position of each rover.

### Goals
- Parse input file defining grid dimensions and rover instructions
- Execute `L`/`R`/`M` command sequences per rover
- Use degree-based math (0°=N, 90°=E, 180°=S, 270°=W) for rotation and movement
- Output final position and direction for each rover

### Success Metrics
- [x] Command parsing (L/R/M)
- [x] Degree-based cardinal direction calculation
- [x] Multiple rovers supported
- [x] Singleton service pattern
- [x] Jest test suite
- [ ] Bounds checking (rover stays within plateau)
- [ ] Input validation for invalid commands

---

## 2. Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Language | TypeScript | 5.x |
| Runtime | Node.js | Latest |
| Testing | Jest | Latest |
| Build | tsc | 5.x |
| Dev | nodemon | Latest |

---

## 3. Architecture

```
Input File (txt)
    ↓
ConsoleController (reads file, orchestrates)
    ↓
RoverControlService (main orchestrator — Singleton)
    ├── DegreeCommandService (maps L/R/M to degree offsets)
    ├── RoverRepository (stores rover state — Singleton)
    └── AxisDegreeUtils (trig-based axis movement calculation)
         ↑
    DegreeCardinalDirection enum (0=N, 90=E, 180=S, 270=W)
```

---

## 4. Module Structure

```
src/
  console.ts                    # Entry point — reads input, calls ConsoleController
  controller/
    ConsoleController.ts        # Parses input, initializes rovers, runs commands
  service/
    DegreeCommandService.ts     # Singleton: maps commands to degree deltas (L=-90, R=+90, M=0)
    RoverControlService.ts      # Singleton: executes command sequences on rovers
  models/
    Area.ts                     # Grid dimensions (maxX, maxY)
    Position.ts                 # x, y, direction (degrees)
    Rover.ts                    # Rover state (id, position)
  repository/
    RoverRepository.ts          # Singleton: stores all rover states
  utils/
    AxisDegreeUtils.ts          # calculateAxis, calcDegree, convertToDegree
    RoverControlUtils.ts        # Utility helpers
  enums/
    DegreeCardinalDirection.ts  # NORTH=0, EAST=90, SOUTH=180, WEST=270
    MoveCommand.ts              # L, R, M
```

---

## 5. Core Logic — Movement Algorithm

```typescript
// DegreeCommandService
L → currentDegree - 90   (turn left)
R → currentDegree + 90   (turn right)
M → currentDegree + 0    (no rotation, move forward)

// AxisDegreeUtils.calculateAxis(value, direction, axisDirection)
// Returns movement on a single axis given facing direction
// Uses: axisSideDistance = |direction - axisDirection| / 90
// If sideDistance > 90, flip axis reference and negate
// Result: partial axis movement (0 if perpendicular, full if parallel)
```

---

## 6. Input Format

```
5 5               ← Plateau max X Y
1 2 N             ← Rover 1 initial position and facing
LMLMLMLMM         ← Rover 1 commands
3 3 E             ← Rover 2 initial position
MMRMMRMRRM        ← Rover 2 commands
```

---

## 7. Testing Strategy

```bash
npm test          # Jest tests
```

Tests in `test/` directory validate movement calculations and command parsing.

---

## 8. Deployment & Operations

```bash
npm run build     # tsc compile
npm start         # Run compiled output
npm run dev       # nodemon hot-reload
```

---

## 9. Issues Found

### Logic Bug — Floating-Point Movement
- **`AxisDegreeUtils.calculateAxis` uses floating-point trig approximation** for grid-based movement. The formula `(axisSideDistance / 90)` produces floats for non-cardinal angles. Since rovers in this kata are grid-aligned (cardinal directions only: 0°, 90°, 180°, 270°), using trig-based approximation is over-engineered and fragile. A simple lookup table or switch/case on the four cardinal directions would be correct, efficient, and deterministic.
- If a rover somehow ends up at 45° (diagonal), `calculateAxis` would return `0.5` movement — a non-integer grid position, which is invalid for a grid-based problem.

### Missing Validations
- **No bounds checking** — a rover can move off the plateau (negative coordinates or beyond maxX/maxY). The problem spec requires rovers to stay within bounds.
- **No collision detection** — two rovers can occupy the same cell.
- **No input validation** — invalid commands (anything other than L/R/M) are not caught.

### Design Issues
- **Singleton pattern throughout** (`DegreeCommandService.getInstance()`, `RoverRepository.getInstance()`) makes unit testing difficult — singletons can't be mocked without resetting global state between tests.
- `RoverRepository` stores state as module-level singleton — parallel test runs or multiple test cases will share state unless explicitly reset.
