import SVG = require('svgson')
type Origin = { x: number, y: number }
type Size = { width: number, height: number }

function useSomeShortCuts(attr: object, propName: string, tx: string[][]) {
   if (typeof attr[propName] == 'object') {
      for (const off in tx) {
         const transform = tx[off]
         attr[transform[0]] = attr[propName][transform[1]]
      }
      delete attr[propName]
   }
}

function createSvgObject(children: object[], origin: Origin, size: Size): object {
   return {
      'name': 'svg',
      'type': 'element',
      'value': '',
      'attributes': {
         width: size.width + '',
         height: size.height + '',
         viewBox: `${origin.x} ${origin.y} ${size.height} ${size.width}`,
         xmlns: 'http://www.w3.org/2000/svg'
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

const path = (attr: object): object => {
   const DEF = {
      fill: 'none',
   }
   const attributes = {...DEF, ...attr}

   return elem('path', attributes)
}
/**
 * Rectangle
 * in @attr will accept a size, an origin, or a rectangle
 */
const rect = (attr: object): object => {
   const DEF = {
      fill: 'none',
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
   return elem('rect', attributes, [])
}
const circle = (attr: object): object => {
   const DEF = {
      fill: 'none',
   }

   useSomeShortCuts(attr, 'center', [
      ['cx', 'x'],
      ['cy', 'y'],
   ])

   if(typeof attr['square'] === 'object'){
      const square = attr['square']
      attr['cx'] = square.x - (square?.side / 2)
      attr['cy'] = square.y - (square?.side / 2)
      attr['r'] = square?.side / 2
      delete attr['square']
   }

   const attributes = {...DEF, ...attr}
   return elem('circle', attributes, [])
}
const line = (attr: object): object => {
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
   return elem('line', attributes, [])
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
module.exports = {
   createSvgObject,
   g,
   elem,
   path,
   rect,
   circle,
   line,
   text,
   stringify: SVG.stringify
}
