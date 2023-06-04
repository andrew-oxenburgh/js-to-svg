const fs = require('fs');
const SVG = require('svgson');

const toSvg = require('../toSvg')

const filename = 'out/number-one.svg'

let json = toSvg.createSvgIcon([
   toSvg.g([
      toSvg.circle({
         cx: 100,
         cy: 100,
         r: 100,
         fill: 'red',
         stroke: 'none'
      }),
      toSvg.text('text', {fill: 'yellow', font: 'italic 100px sans-serif', x:20, y:35}, 'my')
   ])
], {x:0, y:0}, {width:200, height: 200});

let svgDoc = SVG.stringify(json)
fs.writeFileSync(filename, svgDoc)
