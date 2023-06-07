const fs = require('fs')
const toSvg = require('../dist/toSvg')

const filename = 'out/octothorpe.svg'

/*
* Create a # symbol
*
* Create 2 point on top,  left, and bottom right of
*
*
* */

const width = 200
const height = 200
let origin = {x: 0, y: 0};
const size = {width, height}
const offset = 20
const lean = 15

const division = 32
const majorAmount = 11
const minorAmount = division - majorAmount

const topLeftPoint = {x: width * majorAmount / division + lean, y: 0 + offset}
const topRightPoint = {x: width * minorAmount / division + lean, y: 0 + offset}

const bottomLeftPoint = {x: width * majorAmount / division - lean, y: height - offset}
const bottomRightPoint = {x: width * minorAmount / division - lean, y: height - offset}

const leftUpperPoint = {x: 0 + offset, y: height * minorAmount / division}
const leftLowerPoint = {x: 0 + offset, y: height * majorAmount / division}

const rightUpperPoint = {x: width - offset, y: height * minorAmount / division}
const rightLowerPoint = {x: width - offset, y: height * majorAmount / division}

const style = {
   fill: 'white',
   stroke: 'red',
   'stroke-width': 20,
}

const json = toSvg.createSvgObject([
   toSvg.g([
      toSvg.line({
         from: topLeftPoint,
         to: bottomLeftPoint,
         ...style
      }),
      toSvg.line({
         from: topRightPoint,
         to: bottomRightPoint,
         ...style
      }),
      toSvg.line({
         from: leftUpperPoint,
         to: rightUpperPoint,
         ...style
      }),
      toSvg.line({
         from: leftLowerPoint,
         to: rightLowerPoint,
         ...style
      }),
   ])], origin, size)

const svgDoc = toSvg.stringify(json)
fs.writeFileSync(filename, svgDoc)
