
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

const text = (name: string, attr = {}, value = ''): object => {
   return {
      "name": name,
      "type": "element",
      "attributes": attr,
      "value": 'jjjjj'
   }
}

const circle = (attr: {}): object => {
   const DEF = {
      fill: 'none',
   };

   const attributes = {...DEF, ...attr}
   return elem('circle', attributes, [])
}

const g = (children: object[], attr = {}): object => {
   return elem('g', attr, children)
}
function createSvgIcon(children: object[], origin: Origin, size: Size) {
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

module.exports = {
   createSvgIcon,
   g,
   circle,
   line,
   elem,
   text
}
