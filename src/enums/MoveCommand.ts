export enum MoveCommand {
    'M',
    'L',
    'R'
}

export const getMoveCommandFromString = (commandStr: string) => {
    return MoveCommand[commandStr as any];
}