var fs = require('fs')
var toSvg = require('../dist/index')
var path = './out'
var filename = path + '/circle.svg'
var json = toSvg.createSvgObject({ width: 100, height: 100 }, [
   toSvg.circle({
      cx: 50,
      cy: 50,
      r: 50,
      fill: 'red',
      stroke: 'none'
   }),
])
var svgDoc = toSvg.stringify(json)
!fs.existsSync(path) && fs.mkdirSync(path)
fs.writeFileSync(filename, svgDoc)
