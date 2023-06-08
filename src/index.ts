import SVG = require('svgson')
export type Origin = { x: number, y: number }
export type Size = { width: number, height: number }

function useSomeShortCuts(attr: object, propName: string, tx: string[][]) {
   if (typeof attr[propName] == 'object') {
      for (const off in tx) {
         const transform = tx[off]
         attr[transform[0]] = attr[propName][transform[1]]
      }
      delete attr[propName]
   }
}

function createSvgObject(attr: object, children: object[]): object {
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

const g = (children: object[], attr = {}): object => {
   return elem('g', attr, children)
}
const elem = (name: string, attr = {}, children: object[] = []): object => {
   return {
      'name': name,
      'type': 'element',
      'value': '',
      'attributes': attr,
      'children': children
   }
}

const path = (attr: object, children: object[] = []): object => {
   const DEF = {
   }
   const attributes = {...DEF, ...attr}

   return elem('path', attributes, children)
}
/**
 * Rectangle
 * in @attr will accept a size, an origin, or a rectangle
 */
const rect = (attr: object, children: object[] = []): object => {
   const DEF = {
   }
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
const circle = (attr: object, children: object[] = []): object => {
   const DEF = {
      fill: 'none',
   }

   useSomeShortCuts(attr, 'center', [
      ['cx', 'x'],
      ['cy', 'y'],
   ])

   if(typeof attr['square'] === 'object'){
      const square = attr['square']
      attr['cx'] = square.x + (square?.side / 2)
      attr['cy'] = square.y + (square?.side / 2)
      attr['r'] = square?.side / 2
      delete attr['square']
   }

   const attributes = {...DEF, ...attr}
   return elem('circle', attributes, children)
}
const line = (attr: object, children: object[] = []): object => {
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

const text = (attr = {}, text: string): object => {
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
   }
}
const animate = (attr = {}): object => {
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
   animate,
   stringify: SVG.stringify
}
