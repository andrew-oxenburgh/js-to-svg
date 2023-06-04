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

      if(typeof attr?.center =='object'){
         attr.cx = attr.center.x
         attr.cy = attr.center.y
         delete attr.center
      }

      const attributes = {...DEF, ...attr}
      return elem('circle', attributes, [])
   }

   const rect = (attr: any): object => {
      const DEF = {
         fill: 'none',
      };
      if(typeof attr?.origin =='object'){
         attr.x = attr.origin.x
         attr.y = attr.origin.y
         delete attr.origin
      }

      let propName = 'size';
      let newAttr1 = 'width';
      let oldAttr1 = 'width';
      let newAttr2 = 'height';
      let oldAttr2 = 'height';
      if(typeof attr[propName] == 'object'){
         attr[newAttr1] = attr[propName][oldAttr1]
         attr[newAttr2] = attr[propName][oldAttr2]
         delete attr[propName]
      }

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
