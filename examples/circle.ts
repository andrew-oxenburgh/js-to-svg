const fs = require('fs')
const toSvg = require('../dist/index')

const path = './out'
const filename = path + '/circle.svg'

const json = toSvg.createSvgObject({width: 100, height: 100}, [
   toSvg.circle({
      cx: 50,
      cy: 50,
      r: 50,
      fill: 'red',
      stroke: 'none'
   }),
])

const svgDoc = toSvg.stringify(json)

!fs.existsSync(path) && fs.mkdirSync(path)
fs.writeFileSync(filename, svgDoc)
