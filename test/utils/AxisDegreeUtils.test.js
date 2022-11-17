"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const AxisDegreeUtils_1 = require("../../src/utils/AxisDegreeUtils");
(0, globals_1.describe)('AxisDegreeUtils', () => {
    (0, globals_1.test)('calculateAxis', () => {
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calculateAxis(1, 90, 90)).toBe(1);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calculateAxis(1, 90, 180)).toBe(0);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calculateAxis(1, 90, 0)).toBe(0);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calculateAxis(1, 90, 270)).toBe(-1);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calculateAxis(1, 0, 0)).toBe(1);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calculateAxis(1, 0, 90)).toBe(0);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calculateAxis(1, 0, 270)).toBe(0);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calculateAxis(1, 0, 180)).toBe(-1);
    });
    (0, globals_1.test)('calcDegree', () => {
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calcDegree(45, 45)).toBe(90);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calcDegree(0, 45)).toBe(45);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calcDegree(900, 900)).toBe(0);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calcDegree(1000, 170)).toBe(90);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calcDegree(90, -135)).toBe(315);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calcDegree(-1000, -800)).toBe(0);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.calcDegree(-1000, -170)).toBe(270);
    });
    (0, globals_1.test)('convertToDegree', () => {
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.convertToDegree(45)).toBe(45);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.convertToDegree(1800)).toBe(0);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.convertToDegree(1170)).toBe(90);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.convertToDegree(-45)).toBe(315);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.convertToDegree(-1800)).toBe(0);
        (0, globals_1.expect)(AxisDegreeUtils_1.AxisDegreeUtils.convertToDegree(-1170)).toBe(270);
    });
});
