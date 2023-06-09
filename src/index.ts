import SVG = require('svgson')
import * as pathUtils from './path-utilities'

export type NumOrStr = number | string

export type Children = object[]

export type Size = {
   width: number,
   height: number
}

export type VerticalLine = {
   x: number
}

export type HorizontalLine = {
   y: number
}

export type Line = | VerticalLine | HorizontalLine

export type Point = VerticalLine & HorizontalLine

export type Points = Point[]

export type Rect = Point & Size

export type ZeroOrOne = 0 | 1 | '0' | '1'

export type Square = {
   x: number
   y: number
   side: number
}

export type Arc = {
   rx: number
   ry: number
   angle: number
   largeArcFlag: ZeroOrOne
   sweepFlag: ZeroOrOne
   x: number
   y: number
}

export type Attrs = {
   [key: string]: any
}

function useSomeShortCuts(attr: Attrs, propName: string, tx: string[][]) {
   if (typeof attr[propName] == 'object') {
      for (const off in tx) {
         const transform = tx[off]
         attr[transform[0]] = attr[propName][transform[1]]
      }
      delete attr[propName]
   }
}

/**
 * Creates an SVG object, ready for stringifying
 * @param attr
 * @param children
 */
function createSvgObject(attr: Attrs, children: Children): object {
   const DEF = {
      xmlns: 'http://www.w3.org/2000/svg',
   }
   return {
      'name': 'svg',
      'type': 'element',
      'value': '',
      'attributes': {
         ...DEF,
         ...attr
      },
      'children': children
   }
}

const g = (children: Children, attr: Attrs = {}): object => {
   return elem('g', attr, children)
}
const elem = (name: string, attr: Attrs = {}, children: Children = []): object => {
   return {
      'name': name,
      'type': 'element',
      'value': '',
      'attributes': attr,
      'children': children
   }
}

const path = (attr: Attrs, children: Children = []): object => {
   const DEF = {}
   const attributes = {...DEF, ...attr}

   return elem('path', attributes, children)
}
/**
 * Rectangle
 * in @attr will accept a size, an origin, or a rectangle
 */
const rect = (attr: Attrs, children: Children = []): object => {
   const DEF = {}
   useSomeShortCuts(attr, 'size', [
      ['width', 'width'],
      ['height', 'height'],
   ])

   useSomeShortCuts(attr, 'origin', [
      ['x', 'x'],
      ['y', 'y'],
   ])

   useSomeShortCuts(attr, 'rect', [
      ['x', 'x'],
      ['y', 'y'],
      ['width', 'width'],
      ['height', 'height'],
   ])

   const attributes = {...DEF, ...attr}

   return elem('rect', attributes, children)
}
const circle = (attr: Attrs, children: Children = []): object => {
   const DEF = {
      fill: 'none',
   }

   useSomeShortCuts(attr, 'center', [
      ['cx', 'x'],
      ['cy', 'y'],
   ])

   if (typeof attr['square'] === 'object') {
      const square = attr['square']
      attr['cx'] = square.x + (square?.side / 2)
      attr['cy'] = square.y + (square?.side / 2)
      attr['r'] = square?.side / 2
      delete attr['square']
   }

   const attributes = {...DEF, ...attr}
   return elem('circle', attributes, children)
}
const line = (attr: Attrs, children: Children = []): object => {
   const DEF = {
      'stroke-linecap': 'round'
   }
   useSomeShortCuts(attr, 'from', [
      ['x1', 'x'],
      ['y1', 'y'],
   ])
   useSomeShortCuts(attr, 'to', [
      ['x2', 'x'],
      ['y2', 'y'],
   ])

   const attributes = {...DEF, ...attr}
   return elem('line', attributes, children)
}

const text = (attr: Attrs = {}, text: string = 'unknown text'): object => {
   const DEF = {
      font: '30px italic',
      fill: 'red',
      stroke: 'green'
   }
   return {
      'name': 'text',
      'type': 'element',
      'value': '',
      'attributes': {...DEF, ...attr},
      'children': [
         {
            'name': '',
            'type': 'text',
            'value': text,
            'attributes': {},
            'children': []
         }
      ]
   }
}
const title = (text: string): object => {
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
   }
}
const animate = (attr: Attrs = {}): object => {
   return elem(
      'animate',
      attr
   )
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
   pathUtils,
   stringify: SVG.stringify
}
