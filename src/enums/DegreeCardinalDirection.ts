export enum DegreeCardinalDirection {
    N = 0,
    S = 180,
    E = 90,
    W = 270
}
export const getDirectionDegree = (directionStr: string) => {
    return parseInt(DegreeCardinalDirection[directionStr as any]);
}

export const getDegreeDirection = (degreeNum: number) => {
    return DegreeCardinalDirection[degreeNum];
}