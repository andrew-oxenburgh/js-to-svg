function useSomeShortCuts(attr: any, propName: string, tx: string[][]) {
   if (typeof attr[propName] == 'object') {
      for (let off in tx) {
         const transform = tx[off]
         attr[transform[0]] = attr[propName][transform[1]]
      }
      delete attr[propName]
   }
}

module.exports = () => {
   let SVG = require('svgson');

   type Origin = { x: number, y: number };

   type Size = { width: number, height: number };
   const line = (attr: object): object => {
      const DEF = {
         'stroke-linecap': 'round'
      }
      const attributes = {...DEF, ...attr}
      return elem('line', attributes, [])
   }

   const elem = (name: string, attr = {}, children: object[] = [], value = ''): object => {
      return {
         "name": name,
         "type": "element",
         "value": "",
         "attributes": attr,
         "children": children
      }
   }

   const text = (attr = {}, text: string): object => {
      return {
         "name": "text",
         "type": "element",
         "value": "",
         "attributes": attr,
         "children": [
            {
               "name": "",
               "type": "text",
               "value": text,
               "attributes": {},
               "children": []
            }
         ]
      }
   }

   const circle = (attr: any): object => {
      const DEF = {
         fill: 'none',
      };

      useSomeShortCuts(attr, 'center', [
         ['cx', 'x'],
         ['cy', 'y'],
      ]);

      const attributes = {...DEF, ...attr}
      return elem('circle', attributes, [])
   }

   const rect = (attr: any): object => {
      const DEF = {
         fill: 'none',
      };
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

      const attributes = {...DEF, ...attr}
      return elem('rect', attributes, [])
   }

   const g = (children: object[], attr = {}): object => {
      return elem('g', attr, children)
   }

   function createSvgObject(children: object[], origin: Origin, size: Size): object {
      return {
         "name": "svg",
         "type": "element",
         "value": "",
         "attributes": {
            width: size.width + '',
            height: size.height + '',
            viewBox: `${origin.x} ${origin.y} ${size.height} ${size.width}`,
            xmlns: "http://www.w3.org/2000/svg"
         },
         "children": children
      };
   }

   return {
      createSvgObject,
      g,
      circle,
      line,
      elem,
      text,
      rect,
      stringify: SVG.stringify
   }
}
