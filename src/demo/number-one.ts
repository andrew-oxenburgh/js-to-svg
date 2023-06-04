const fs = require('fs');
const toSvg = require('../toSvg')()

const filename = 'out/number-one.svg'

let json = toSvg.createSvgObject([
   toSvg.g([
      toSvg.circle({
         cx: 100,
         cy: 100,
         r: 100,
         fill: 'white',
         stroke: 'none'
      }),
      toSvg.rect({
         width: 200,
         height: 200,
         x: 0,
         y: 0,
         fill: 'red',
         stroke: 'none'
      }),
      toSvg.circle({
         cx: 100,
         cy: 100,
         r: 85,
         fill: 'yellow',
         stroke: 'none'
      }),
      toSvg.text({
         fill: 'red',
         font: 'bold 120px sans-serif',
         x: '50%',
         y: '70%',
         "text-anchor": "middle",
         "dominant-baseline": "middle",
      }, '1')
   ])
], {x: 0, y: 0}, {width: 200, height: 200});

let svgDoc = toSvg.stringify(json)
fs.writeFileSync(filename, svgDoc)
