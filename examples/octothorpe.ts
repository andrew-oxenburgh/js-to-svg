const fs = require('fs')
const toSvg = require('../dist/index')

const filename = 'out/octothorpe.svg'

const width = 200
const height = 200
const origin = {x: 0, y: 0}
const size = {width, height}

// inset from margins of view
const inset = 20

// how far from vertical does it lean.
const lean = 15

const division = 32
const majorAmount = 11
const minorAmount = division - majorAmount

// top
const topLeftPoint = {x: width * majorAmount / division + lean, y: 0 + inset}
const topRightPoint = {x: width * minorAmount / division + lean, y: 0 + inset}

// right
const rightUpperPoint = {x: width - inset, y: height * minorAmount / division}
const rightLowerPoint = {x: width - inset, y: height * majorAmount / division}

// bottom
const bottomLeftPoint = {x: width * majorAmount / division - lean, y: height - inset}
const bottomRightPoint = {x: width * minorAmount / division - lean, y: height - inset}

// left
const leftUpperPoint = {x: 0 + inset, y: height * minorAmount / division}
const leftLowerPoint = {x: 0 + inset, y: height * majorAmount / division}

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
