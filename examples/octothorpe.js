var __assign = (this && this.__assign) || function () {
   __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
         s = arguments[i]
         for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p]
      }
      return t
   }
   return __assign.apply(this, arguments)
}
var fs = require('fs')
var toSvg = require('../dist/index')
var path = './out'
var filename = path + '/octothorpe.svg'
var width = 200
var height = 200
var origin = { x: 0, y: 0 }
var size = { width: width, height: height }
// inset from margins of view
var inset = 20
// how far from vertical does it lean.
var lean = 15
var division = 32
var majorAmount = 11
var minorAmount = division - majorAmount
// top
var topLeftPoint = { x: width * majorAmount / division + lean, y: 0 + inset }
var topRightPoint = { x: width * minorAmount / division + lean, y: 0 + inset }
// right
var rightUpperPoint = { x: width - inset, y: height * minorAmount / division }
var rightLowerPoint = { x: width - inset, y: height * majorAmount / division }
// bottom
var bottomLeftPoint = { x: width * majorAmount / division - lean, y: height - inset }
var bottomRightPoint = { x: width * minorAmount / division - lean, y: height - inset }
// left
var leftUpperPoint = { x: 0 + inset, y: height * minorAmount / division }
var leftLowerPoint = { x: 0 + inset, y: height * majorAmount / division }
var style = {
   fill: 'white',
   stroke: 'red',
   'stroke-width': 20,
}
var json = toSvg.createSvgObject([
   toSvg.g([
      toSvg.line(__assign({ from: topLeftPoint, to: bottomLeftPoint }, style)),
      toSvg.line(__assign({ from: topRightPoint, to: bottomRightPoint }, style)),
      toSvg.line(__assign({ from: leftUpperPoint, to: rightUpperPoint }, style)),
      toSvg.line(__assign({ from: leftLowerPoint, to: rightLowerPoint }, style)),
   ])
], origin, size)
var svgDoc = toSvg.stringify(json)
!fs.existsSync(path) && fs.mkdirSync(path)
fs.writeFileSync(filename, svgDoc)
