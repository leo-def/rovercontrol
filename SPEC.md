# RoverControl - Technical Specification

> Technical specification for the Mars Rover Navigation CLI Application.
> Reference for understanding rover control and navigation algorithms.

## Executive Summary

- **Project**: RoverControl
- **Type**: Command-line rover navigation system
- **Language**: TypeScript/JavaScript (Node.js 16+)
- **Status**: Active Development
- **Owner**: Development team

---

## 1. Problem Statement

### Context
RoverControl is a NASA Mars rover control system that processes rover commands and manages navigation on a rectangular plateau. Rovers receive commands (L=left, R=right, M=move) and report their position and heading.

### Goals
- **Primary**: Implement rover control with coordinate system and heading management
- **Secondary**: Support multiple rovers operating independently
- **Tertiary**: Provide clear command processing with error handling

### Success Metrics
- [x] Process rover commands (L, R, M)
- [x] Track position (x, y) and heading (N, S, E, W)
- [x] Validate plateau boundaries
- [x] Support multiple rovers
- [x] Handle command sequences
- [ ] Performance: <100ms per 1000 commands
- [ ] 100% command accuracy

---

## 2. Technology Stack

| Component | Technology | Version | Rationale |
|-----------|-----------|---------|-----------|
| Runtime | Node.js | 16.0+ | JavaScript execution |
| Language | TypeScript | 4.5+ | Type safety |
| Package Manager | npm/yarn | Latest | Dependency management |
| Build | tsc (TypeScript Compiler) | 4.5+ | Transpile to JavaScript |
| Testing | Jest | 27.0+ | Testing framework |

### Key Dependencies
- `typescript`: Language and compiler
- `jest`: Testing framework (dev dependency)
- No production dependencies needed

---

## 3. Architecture

### Rover Navigation System

```
┌─────────────────────────────────────────┐
│       Command Parser (CLI Input)        │
│  "MMRMMRMRRM" → [M, M, R, M, M, R, ...]│
└────────────────────┬────────────────────┘
                     │
┌────────────────────▼────────────────────┐
│     Rover Control Logic                 │
│  (Position tracking, heading mgmt)      │
└────────────────────┬────────────────────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
         ▼           ▼           ▼
    ┌────────┐  ┌────────┐  ┌────────┐
    │ Rover1 │  │ Rover2 │  │ RoverN │
    │(x,y,H) │  │(x,y,H) │  │(x,y,H) │
    └────────┘  └────────┘  └────────┘
         │           │           │
         └───────────┼───────────┘
                     │
┌────────────────────▼────────────────────┐
│       Output: Final Positions           │
│  1 3 N                                  │
│  5 1 E                                  │
│  5 2 N                                  │
└─────────────────────────────────────────┘
```

### Coordinate System

```
5 · · · · ·
4 · · · · ·
3 · · · · ·
2 · · · · ·
1 · · · · ·
0 · · · · ·
  0 1 2 3 4 5

Position: (1, 2, N)
- X: 1, Y: 2, Heading: North (N)

Headings: N (North), E (East), S (South), W (West)
L = Turn Left 90°
R = Turn Right 90°
M = Move Forward 1 grid point
```

---

## 4. Project Structure

```
rovercontrol/
├── src/
│   ├── index.ts                  # Entry point / CLI
│   ├── models/
│   │   ├── Rover.ts             # Rover class
│   │   ├── Position.ts          # Position/heading
│   │   └── Plateau.ts           # Navigation bounds
│   ├── services/
│   │   ├── RoverController.ts   # Control logic
│   │   ├── CommandParser.ts     # Parse input
│   │   └── NavigationService.ts # Movement logic
│   └── utils/
│       ├── logger.ts
│       └── validators.ts
├── test/
│   ├── rover.test.ts
│   ├── navigation.test.ts
│   └── integration.test.ts
├── build/
│   └── (compiled JavaScript)
├── tsconfig.json
├── jest.config.js
├── package.json
└── README.md
```

---

## 5. Core Components

### Rover Class

```typescript
class Rover {
  x: number;
  y: number;
  heading: 'N' | 'S' | 'E' | 'W';
  plateau: Plateau;

  moveForward(): void { ... }
  turnLeft(): void { ... }
  turnRight(): void { ... }
  processCommands(commands: string[]): void { ... }
  getPosition(): string { ... } // "x y heading"
}
```

### Heading Transitions

```
        N
        |
    W---+---E
        |
        S

N → R → E → R → S → R → W → R → N
N → L → W → L → S → L → E → L → N
```

### Movement Logic

```typescript
moveForward(x, y, heading) {
  switch (heading) {
    case 'N': return (x, y + 1);
    case 'S': return (x, y - 1);
    case 'E': return (x + 1, y);
    case 'W': return (x - 1, y);
  }
}
```

---

## 6. Input/Output Format

### Input
```
5 5           // Plateau dimensions (5x5 grid)
1 2 N         // Rover 1 initial position
LMLMLMLMM     // Rover 1 commands
3 3 E         // Rover 2 initial position
MMRMMRMRRM    // Rover 2 commands
```

### Output
```
1 3 N
5 1 E
```

---

## 7. Command Processing

### Command Sequence Example

```
Rover: 1 2 N
Commands: LMLMLMLMM

Step 1: L (turn left)  → 1 2 W
Step 2: M (move)      → 0 2 W
Step 3: L (turn left) → 0 2 S
Step 4: M (move)      → 0 1 S
Step 5: L (turn left) → 0 1 E
Step 6: M (move)      → 1 1 E
Step 7: L (turn left) → 1 1 N
Step 8: M (move)      → 1 2 N
Step 9: M (move)      → 1 3 N

Final: 1 3 N ✓
```

