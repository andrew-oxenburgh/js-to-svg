'use strict'
import {expect} from '@jest/globals'

const toSvg = require('../src/index')
const pd = require('pretty-data').pd
const fs = require('fs')

function expectSnapshot(json: object, title: string | null = null) {
   const inputArray = title ? [toSvg.title(title), json] : [json]
   const wrapped = toSvg.createSvgObject(
      {width: 1000, height: 1000},
      inputArray
   )
   let actual = toSvg.stringify(wrapped)
   actual = pd.xml(actual)
   const testname = expect.getState().currentTestName
   const dir = './tests/__out__/'
   const htmlFile = dir + testname.replace(/ /g, '_') + '.html'
   const svgFile = dir + testname.replace(/ /g, '_') + '.svg'

   !fs.existsSync(dir) && fs.mkdirSync(dir)
   fs.existsSync(htmlFile) && fs.unlinkSync(htmlFile)
   fs.writeFileSync(htmlFile, actual)
   fs.existsSync(svgFile) && fs.unlinkSync(svgFile)
   fs.writeFileSync(svgFile, actual)

   expect(actual).toMatchSnapshot()
}

describe('clipPath', () => {
   test('heart', () => {
      const json = [
         toSvg.elem('clipPath',
            {id: 'myClip'},
            [
               toSvg.circle({cx: 40, cy: 40, r: 20, fill: 'red'})
            ]
         ),
         toSvg.path({
            id: 'heart',
            d: 'M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z'
         }),
         toSvg.elem('use',
            {
               'clip-path': 'url(#myClip)',
               href: '#heart',
               fill: 'red'
            })
      ]
      expectSnapshot(json, 'demonstrate clipping')
   })
})
describe('really small', () => {
   test('circle', () => {
      const square = {x: 0, y: 0, side: 100}
      const circle = toSvg.circle({square, fill: 'yellow'})
      toSvg.stringify(circle)
   })
})
describe('animation', () => {
   describe('rect', () => {
      test('rx', () => {
         const size = {width: 200, height: 200}
         const origin = {x: 0, y: 0}
         const json = toSvg.rect({
            origin,
            size,
            fill: 'red',
            stroke: 'none',
         }, [
            toSvg.animate({
                  attributeName: 'rx',
                  values: '0;200;0',
                  dur: '2s',
                  repeatCount: 'indefinite'
               }
            )
         ])
         expectSnapshot(json, 'create a rect given a size and an origin')
      })
   })
   describe('circle', () => {
      test('radius', () => {
         const json = [
            toSvg.rect({
               rect: {x: 0, y: 0, width: 2000, height: 2000},
               fill: 'red'
            }),
            toSvg.circle({
               center: {x: 500, y: 500},
               r: 50,
               fill: 'red',
               stroke: 'none',
            }, [
               toSvg.animate({
                     attributeName: 'r',
                     values: '0;100;0',
                     dur: '5s',
                     repeatCount: 'indefinite'
                  }
               ),
               toSvg.animate({
                     attributeName: 'fill',
                     values: 'blue;red;green',
                     dur: '3s',
                     repeatCount: 'indefinite'
                  }
               ),
               toSvg.animate({
                     attributeName: 'cx',
                     values: '0;400',
                     dur: '5s',
                     repeatCount: 'indefinite'
                  }
               ),
               toSvg.animate({
                     attributeName: 'cy',
                     values: '0;400',
                     dur: '5s',
                     repeatCount: 'indefinite'
                  }
               )
            ])]
         expectSnapshot(json, 'a bunch of really ugly animations')
      })
   })
})
describe('svg', () => {
   describe('rect', () => {
      test('standard', () => {
         const json = toSvg.rect({
            width: 777,
            height: 888,
            x: 0,
            y: 1,
            fill: 'red',
            stroke: 'none'
         })
         expectSnapshot(json, 'create a rect using standard svg attributes')
      })
      test('origin and size', () => {
         const origin = {x: 0, y: 1}
         const size = {width: 345, height: 678}
         const json = toSvg.rect({
            origin,
            size,
            fill: 'red',
            stroke: 'none'
         })
         expectSnapshot(json, 'create a rect with an origin and a size')
      })
      test('rect', () => {
         const rect = {x: 1, y: 2, width: 100, height: 200}
         const json = toSvg.rect({
            rect,
            fill: 'red',
            stroke: 'none'
         })
         expectSnapshot(json, 'create a rect with a input rect structure')
      })
   })
   describe('circle', () => {
      test('standard', () => {
         const json = toSvg.circle({
            cx: 500,
            cy: 500,
            r: 300,
            fill: 'yellow',
            stroke: 'none'
         })
         expectSnapshot(json, 'create a circle with standard svg attributes')
      })
      test('point and radius', () => {
         const center = {x: 181, y: 191}
         const json = toSvg.circle({
            center,
            r: 233,
            fill: 'red',
            stroke: 'none'
         })
         expectSnapshot(json, 'create a circle with a center point and a radius')
      })
      test('bounding square', () => {
         const square = {x: 0, y: 0, side: 500}
         const json = toSvg.circle({
            square,
            fill: 'red',
            stroke: 'none'
         })
         expectSnapshot(json, 'create a circle with a bounding square')
      })
   })

   describe('doc', () => {
      test('empty doc', () => {
         expectSnapshot([], 'create an empty doc')
      })
   })
   describe('path', () => {
      test('a short line', () => {
         const json = toSvg.path({
            d: 'M 100 100 H 300 Z',
            fill: 'red',
            stroke: 'orange',
            'stroke-width': 10
         })
         expectSnapshot(json, 'create a path')
      })
   })
   describe('composite doc', () => {
      test('many circles', () => {
         const circle1 = toSvg.circle({
            center: {x: 500, y: 500},
            r: 500,
            fill: 'yellow',
            stroke: 'none'
         })
         const circle2 = toSvg.circle({
            center: {x: 500, y: 500},
            r: 400,
            fill: 'green',
            stroke: 'none'
         })
         const circle3 = toSvg.circle({
            center: {x: 500, y: 500},
            r: 300,
            fill: 'blue',
            stroke: 'none'
         })
         expectSnapshot([
            circle1,
            circle2,
            circle3
         ], 'got lots of things going on')
      })
   })
})

test('animateMotion', () => {
   const path = 'M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z'
   const json = toSvg.g([
      toSvg.path({fill: 'none', stroke: 'lightgrey', d: path}),
      toSvg.circle({r: 5, fill: 'red'}, [
         toSvg.elem('animateMotion', {
            dur: '10s',
            repeatCount: 'indefinite',
            path
         })
      ]),
   ])
   expectSnapshot(json, 'animateMotion')
})
