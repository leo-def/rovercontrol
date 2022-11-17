import { maxHeaderSize } from "http";

export class AxisDegreeUtils {
    static calculateAxis(value: number, direction: number, axisDirection: number) {
        90
        let axisSideDistance = Math.abs(direction - axisDirection);
        let mult = 1;
        if(axisSideDistance > 90) {
            axisDirection = AxisDegreeUtils.calcDegree(axisDirection, 180);
            axisSideDistance = Math.abs(direction - axisDirection);
            mult = -1;
        }
        const diffPer = (axisSideDistance / 90);
        if(diffPer === 1) {
            return 0;
        }
        const diff = 1 - diffPer;
        return ( mult * value * diff);

    }

    static calcDegree(a: number, b: number){
        return  AxisDegreeUtils.convertToDegree(a + b);
    }
 
    static convertToDegree(value: number): number {
        if(value >= 360) {
            return AxisDegreeUtils.convertToDegree(
                value - 360
            );
        } else if (value <= -360) {
            return AxisDegreeUtils.convertToDegree(
                value + 360
            );
        }
        if (value < 0) {
            return 360 + value
        } else {
            return value;
        }
    }
}