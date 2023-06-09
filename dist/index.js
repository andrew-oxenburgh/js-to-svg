"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SVG = require("svgson");
function useSomeShortCuts(attr, propName, tx) {
    if (typeof attr[propName] == 'object') {
        for (const off in tx) {
            const transform = tx[off];
            attr[transform[0]] = attr[propName][transform[1]];
        }
        delete attr[propName];
    }
}
function createSvgObject(attr, children) {
    const DEF = {
        xmlns: 'http://www.w3.org/2000/svg',
    };
    return {
        'name': 'svg',
        'type': 'element',
        'value': '',
        'attributes': Object.assign(Object.assign({}, DEF), attr),
        'children': children
    };
}
const g = (children, attr = {}) => {
    return elem('g', attr, children);
};
const elem = (name, attr = {}, children = []) => {
    return {
        'name': name,
        'type': 'element',
        'value': '',
        'attributes': attr,
        'children': children
    };
};
const path = (attr, children = []) => {
    const DEF = {};
    const attributes = Object.assign(Object.assign({}, DEF), attr);
    return elem('path', attributes, children);
};
/**
 * Rectangle
 * in @attr will accept a size, an origin, or a rectangle
 */
const rect = (attr, children = []) => {
    const DEF = {};
    useSomeShortCuts(attr, 'size', [
        ['width', 'width'],
        ['height', 'height'],
    ]);
    useSomeShortCuts(attr, 'origin', [
        ['x', 'x'],
        ['y', 'y'],
    ]);
    useSomeShortCuts(attr, 'rect', [
        ['x', 'x'],
        ['y', 'y'],
        ['width', 'width'],
        ['height', 'height'],
    ]);
    const attributes = Object.assign(Object.assign({}, DEF), attr);
    return elem('rect', attributes, children);
};
const circle = (attr, children = []) => {
    const DEF = {
        fill: 'none',
    };
    useSomeShortCuts(attr, 'center', [
        ['cx', 'x'],
        ['cy', 'y'],
    ]);
    if (typeof attr['square'] === 'object') {
        const square = attr['square'];
        attr['cx'] = square.x + ((square === null || square === void 0 ? void 0 : square.side) / 2);
        attr['cy'] = square.y + ((square === null || square === void 0 ? void 0 : square.side) / 2);
        attr['r'] = (square === null || square === void 0 ? void 0 : square.side) / 2;
        delete attr['square'];
    }
    const attributes = Object.assign(Object.assign({}, DEF), attr);
    return elem('circle', attributes, children);
};
const line = (attr, children = []) => {
    const DEF = {
        'stroke-linecap': 'round'
    };
    useSomeShortCuts(attr, 'from', [
        ['x1', 'x'],
        ['y1', 'y'],
    ]);
    useSomeShortCuts(attr, 'to', [
        ['x2', 'x'],
        ['y2', 'y'],
    ]);
    const attributes = Object.assign(Object.assign({}, DEF), attr);
    return elem('line', attributes, children);
};
const text = (attr = {}, text) => {
    return {
        'name': 'text',
        'type': 'element',
        'value': '',
        'attributes': attr,
        'children': [
            {
                'name': '',
                'type': 'text',
                'value': text,
                'attributes': {},
                'children': []
            }
        ]
    };
};
const title = (text) => {
    return {
        'name': 'title',
        'type': 'element',
        'value': '',
        'attributes': {},
        'children': [
            {
                'name': '',
                'type': 'text',
                'value': text,
                'attributes': {},
                'children': []
            }
        ]
    };
};
const animate = (attr = {}) => {
    return elem('animate', attr);
};
const moveA = (point) => {
    return `M${point.x},${point.y}`;
};
const moveR = (point) => {
    return `m${point.x},${point.y}`;
};
const complete = () => {
    return 'Z';
};
function arcA(arc) {
    if (typeof arc === 'string') {
        return arc;
    }
    return `A${arc.rx},${arc.ry},${arc.angle},${arc.largeArcFlag},${arc.sweepFlag},${arc.x},${arc.y}`;
}
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
    const res = 'Q' + points.reduce((acc, point) => {
        acc += `${point.x},${point.y},`;
        return acc;
    }, '');
    const removeTrailingComma = res.slice(0, res.length - 1);
    return removeTrailingComma;
}
module.exports = {
    createSvgObject,
    g,
    elem,
    path,
    rect,
    circle,
    line,
    text,
    title,
    animate,
    quadraticA,
    moveA,
    moveR,
    arcA,
    complete,
    stringify: SVG.stringify
};
//# sourceMappingURL=index.js.map