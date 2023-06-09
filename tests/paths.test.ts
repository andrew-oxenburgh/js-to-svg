'use strict'
import {expectSnapshot} from './test-utils'
import {Arc, VerticalLine, HorizontalLine, Point, Points, Rect, Children} from '../src'

const toSvg = require('../src/index')
const u = toSvg.pathUtils
describe('fixing-path', () => {
   test('heart', () => {
      const boundingRect: Rect = {y: 0, x: 0, height: 1000, width: 1000}
      const centerLine: VerticalLine = {x: 500}
      const leftLine: VerticalLine = {x: 100}
      const rightLine: VerticalLine = {x: 900}
      const bulgeLine: HorizontalLine = {y: 300}
      const lowerBulgeLine: HorizontalLine = {y: 600}
      const topLine: HorizontalLine = {y: 900}
      const startingPoint: Point = {x: 100, ...bulgeLine}

      const dipPoint: Point = {...centerLine, ...bulgeLine}

      const leftUpper: Arc = {rx: 200, ry: 200, angle: 0, largeArcFlag: 0, sweepFlag: 1, ...dipPoint}
      const rightUpper: Arc = {...leftUpper, ...rightLine}
      const rightLower: Points = [
         {...rightLine, ...lowerBulgeLine},
         {...centerLine, ...topLine},
         {...leftLine, ...lowerBulgeLine},
         startingPoint
      ]

      const path = [
         u.moveA(startingPoint),
         u.arcA(leftUpper),
         u.arcA(rightUpper),
         u.quadraticA(rightLower),
         u.complete()
      ]

      const json: Children = [
         toSvg.rect({...boundingRect, fill: 'lightblue'}),
         toSvg.path({
            id: 'heart',
            d: path.join(''),
            fill: 'lightcoral'
         }),
      ]
      expectSnapshot(json, 'complex path using arcs and quads')
   })
})
