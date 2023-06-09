"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SVG = require("svgson");
const pathUtils = require("./path-utilities");
function useSomeShortCuts(attr, propName, tx) {
    if (typeof attr[propName] == 'object') {
        for (const off in tx) {
            const transform = tx[off];
            attr[transform[0]] = attr[propName][transform[1]];
        }
        delete attr[propName];
    }
}
/**
 * Creates an SVG object, ready for stringifying
 * @param attr
 * @param children
 */
function createSvgObject(attr, children) {
    const DEF = {
        xmlns: 'http://www.w3.org/2000/svg',
    };
    return {
        name: 'svg',
        type: 'element',
        value: '',
        attributes: Object.assign(Object.assign({}, DEF), attr),
        children: children
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
        attr['cx'] = square['x'] + (square['side'] / 2);
        attr['cy'] = square['y'] + (square['side'] / 2);
        attr['r'] = square['side'] / 2;
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
const text = (attr = {}, text = 'unknown text') => {
    const DEF = {
        font: '30px italic',
        fill: 'red',
        stroke: 'green',
        x: 0,
        y: '50%'
    };
    return {
        'name': 'text',
        'type': 'element',
        'value': '',
        'attributes': Object.assign(Object.assign({}, DEF), attr),
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
    pathUtils,
    stringify: SVG.stringify
};
//# sourceMappingURL=index.js.map