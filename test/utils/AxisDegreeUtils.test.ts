
import { describe, expect, test } from '@jest/globals';
import { AxisDegreeUtils } from '../../src/utils/AxisDegreeUtils';

describe('AxisDegreeUtils', () => {

    test('calculateAxis', () => {
        expect(AxisDegreeUtils.calculateAxis(1, 90, 90)).toBe(1);
        expect(AxisDegreeUtils.calculateAxis(1, 90, 180)).toBe(0);
        expect(AxisDegreeUtils.calculateAxis(1, 90, 0)).toBe(0);
        expect(AxisDegreeUtils.calculateAxis(1, 90, 270)).toBe(-1);
        expect(AxisDegreeUtils.calculateAxis(1, 0, 0)).toBe(1);
        expect(AxisDegreeUtils.calculateAxis(1, 0, 90)).toBe(0);
        expect(AxisDegreeUtils.calculateAxis(1, 0, 270)).toBe(0);
        expect(AxisDegreeUtils.calculateAxis(1, 0, 180)).toBe(-1);
    });

    test('calcDegree', () => {
        expect(AxisDegreeUtils.calcDegree(45, 45)).toBe(90);
        expect(AxisDegreeUtils.calcDegree(0, 45)).toBe(45);
        expect(AxisDegreeUtils.calcDegree(900, 900)).toBe(0);
        expect(AxisDegreeUtils.calcDegree(1000, 170)).toBe(90);
        expect(AxisDegreeUtils.calcDegree(90, -135)).toBe(315);
        expect(AxisDegreeUtils.calcDegree(-1000, -800)).toBe(0);
        expect(AxisDegreeUtils.calcDegree(-1000, -170)).toBe(270);
    });

    test('convertToDegree', () => {
        expect(AxisDegreeUtils.convertToDegree(45)).toBe(45);
        expect(AxisDegreeUtils.convertToDegree(1800)).toBe(0);
        expect(AxisDegreeUtils.convertToDegree(1170)).toBe(90);
        expect(AxisDegreeUtils.convertToDegree(-45)).toBe(315);
        expect(AxisDegreeUtils.convertToDegree(-1800)).toBe(0);
        expect(AxisDegreeUtils.convertToDegree(-1170)).toBe(270);
    });
});