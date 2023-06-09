'use strict'
import {testUtils} from "./test-utils";

const toSvg = require('../src/index')

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
      testUtils(json, 'demonstrate clipping')
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
         testUtils(json, 'create a rect given a size and an origin')
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
         testUtils(json, 'a bunch of really ugly animations')
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
         testUtils(json, 'create a rect using standard svg attributes')
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
         testUtils(json, 'create a rect with an origin and a size')
      })
      test('rect', () => {
         const rect = {x: 1, y: 2, width: 100, height: 200}
         const json = toSvg.rect({
            rect,
            fill: 'red',
            stroke: 'none'
         })
         testUtils(json, 'create a rect with a input rect structure')
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
         testUtils(json, 'create a circle with standard svg attributes')
      })
      test('point and radius', () => {
         const center = {x: 181, y: 191}
         const json = toSvg.circle({
            center,
            r: 233,
            fill: 'red',
            stroke: 'none'
         })
         testUtils(json, 'create a circle with a center point and a radius')
      })
      test('bounding square', () => {
         const square = {x: 0, y: 0, side: 500}
         const json = toSvg.circle({
            square,
            fill: 'red',
            stroke: 'none'
         })
         testUtils(json, 'create a circle with a bounding square')
      })
   })

   describe('doc', () => {
      test('empty doc', () => {
         testUtils([], 'create an empty doc')
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
         testUtils(json, 'create a path')
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
         testUtils([
            circle1,
            circle2,
            circle3
         ], 'got lots of things going on')
      })
   })
})

test('animateMotion', () => {
   const green = '#8FBC8F'
   const path = 'M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z'
   const json = toSvg.g([
      toSvg.rect({fill: green, stroke: 'none', rect: {x: 0, y: 0, width: 200, height: 100}}),
      toSvg.path({fill: 'none', stroke: 'lightgrey', d: path}),
      toSvg.circle({r: 5, fill: 'coral'}, [
         toSvg.elem('animateMotion', {
            dur: '10s',
            repeatCount: 'indefinite',
            path
         })
      ]),
   ])
   testUtils(json, 'animateMotion')
})

test('boxesWithinBoxes', () => {
   function shrink(rect: { x: number, width: number, y: number, height: number }) {
      return {
         x: rect.x + 100,
         y: rect.y + 100,
         width: rect.width - 200,
         height: rect.height - 200
      }
   }
   const rect1 = {x: 0, y: 0, width: 1000, height: 1000}
   const rect2 = shrink(rect1)
   const rect3 = shrink(rect2)
   const rect4 = shrink(rect3)
   const json = toSvg.g([
      toSvg.rect({rect: rect1, fill: 'green', stroke: 'none'}),
      toSvg.rect({rect: rect2, fill: 'orange', stroke: 'none'}),
      toSvg.rect({rect: rect3, fill: 'yellow', stroke: 'none'}),
      toSvg.rect({rect: rect4, fill: 'purple', stroke: 'none'}),
   ])
   testUtils(json, 'boxesWithinBoxes')
})
