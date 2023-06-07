const fs = require('fs');

const toSvg = require('../toSvg')()

const filename = 'out/circle.svg'

const json = toSvg.createSvgObject([
   toSvg.g([
      toSvg.circle({
         cx: 1000,
         cy: 1000,
         r: 1000,
         fill: 'red',
         stroke: 'none'
      }),
   ])
], {x:0, y:0}, {width:2000, height: 2000})

const svgDoc = toSvg.stringify(json)
fs.writeFileSync(filename, svgDoc)
