"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quadraticA = exports.arcA = exports.complete = exports.moveR = exports.moveA = void 0;
const moveA = (point) => {
    if (typeof point === 'string') {
        return point;
    }
    return `M${point.x},${point.y}`;
};
exports.moveA = moveA;
const moveR = (point) => {
    return `m${point.x},${point.y}`;
};
exports.moveR = moveR;
const complete = () => {
    return 'Z';
};
exports.complete = complete;
function arcA(arc) {
    if (typeof arc === 'string') {
        return arc;
    }
    return `A${arc.rx},${arc.ry},${arc.angle},${arc.largeArcFlag},${arc.sweepFlag},${arc.x},${arc.y}`;
}
exports.arcA = arcA;
/**
 * Accept an array of points
 * @param points
 */
function quadraticA(points) {
    if (typeof points === 'string') {
        return points;
    }
    if (points.length < 1) {
        return '';
    }
    if (points.length % 2) {
        throw 'Quadratic Error: requires an even number of points';
    }
    const res = 'Q' + points.reduce((acc, point) => {
        acc += `${point.x},${point.y} `;
        return acc;
    }, '');
    const removeTrailingComma = res.slice(0, res.length - 1);
    return removeTrailingComma;
}
exports.quadraticA = quadraticA;
//# sourceMappingURL=path-utilities.js.map