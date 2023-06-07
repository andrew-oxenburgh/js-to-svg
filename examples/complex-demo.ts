const fs = require('fs')
const toSvg = require('../dist/toSvg')()

const filename = './out/complex-demo.svg'

console.log('outputting to = ' + filename)

const width = 2000
const height = 2000
const iconRadius = height / 2

const xMiddle = width / 2
const yMiddle = height / 2
const bgColor = '#558e90'
const fgColor = 'white'


// VVVVVVVVVVVVVVV
const rimRadius = 350
const rimStrokeWidth = 50
const rimSeparation = 420

const hingeFromEdge = 120
const hingeLength = 90
const hingeStrokeWidth = 90

const bridgeSpreadFudgeFactor = 125
const bridgeCurveFudgeFactor = 30

const bridgeRaiseFromRims = 55
const bridgeUpperCurve = 90
const bridgeStrokeWidth = 90
const bridgeStart = xMiddle + bridgeSpreadFudgeFactor
   - (rimSeparation / 2)
const bridgeEnd = xMiddle - bridgeSpreadFudgeFactor
   + (rimSeparation / 2)

//^^^^^^^^^^^^^^^^^


const rotationCalc = 'translate(380 -270) rotate(19)'


const rim = {
   cy: yMiddle,
   r: rimRadius,
   stroke: fgColor,
   'stroke-width': rimStrokeWidth,
}

const hinge = {
   y1: yMiddle,
   y2: yMiddle,
   stroke: fgColor,
   'stroke-width': hingeStrokeWidth,
}

const bridge = `M ${bridgeStart} ${xMiddle - (bridgeRaiseFromRims + bridgeCurveFudgeFactor)} Q ${yMiddle} ${xMiddle - bridgeRaiseFromRims - bridgeUpperCurve}, ${bridgeEnd} ${xMiddle - (bridgeRaiseFromRims + bridgeCurveFudgeFactor)}`

const json = toSvg.createSvgObject([
   toSvg.g([
      // outer
      toSvg.circle({
         cx: xMiddle,
         cy: yMiddle,
         r: iconRadius,
         fill: bgColor,
         stroke: 'none'
      }),
      // left hinge
      toSvg.line({...hinge, x1: hingeFromEdge, x2: hingeFromEdge + hingeLength}),
      // right hinge
      toSvg.line({...hinge, x1: width - hingeFromEdge, x2: width - hingeFromEdge - hingeLength}),
      // bridge
      toSvg.elem('path', {
         d: bridge,
         stroke: fgColor,
         'stroke-width': bridgeStrokeWidth,
         fill: 'none'
      }, []),
      // left eye
      toSvg.circle({...rim, cx: xMiddle - rimSeparation}),
      // right eye
      toSvg.circle({...rim, cx: xMiddle + rimSeparation}),
   ], {transform: rotationCalc})
], {x:0, y:0}, {width:2000, height: 2000})

const svg = toSvg.stringify(json)
fs.writeFileSync(filename, svg)
