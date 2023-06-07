const toSvg = require('../src/index')

describe('svg', () => {
   describe('rect', () => {
      test(' - svg standard', () => {
         const json = toSvg.rect({
            width: 33,
            height: 44,
            x: 0,
            y: 1,
            fill: 'red',
            stroke: 'none'
         })
         const actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot()
      })
      test(' - using origin and size', () => {
         const json = toSvg.rect({
            origin: {x: 0, y: 1},
            size: {width: 3, height: 7},
            fill: 'red',
            stroke: 'none'
         })
         const actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot()
      })
      test(' - using a rect', () => {
         const json = toSvg.rect({
            rect: {x: 1, y: 2, width: 100, height: 200},
            fill: 'red',
            stroke: 'none'
         })
         const actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot()
      })
   })
   describe('circle', () => {
      test(' - svg standard', () => {
         const json = toSvg.circle({
            cx: 100,
            cy: 150,
            r: 165,
            fill: 'red',
            stroke: 'none'
         })
         const actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot()
      })
      test(' - using a point', () => {
         const json = toSvg.circle({
            center: {x: 181, y: 191},
            r: 233,
            fill: 'red',
            stroke: 'none'
         })
         const actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot()
      })
      test(' - using a bounding square', () => {
         const json = toSvg.circle({
            square: {x: 50, y: 60, side: 100},
            fill: 'red',
            stroke: 'none'
         })
         const actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot()
      })
   })

   describe('doc', () => {
      test('empty doc', () => {
         const json = toSvg.createSvgObject(
            [],
            {x: 1, y: 2},
            {width: 200, height: 250})
         const actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot()
      })
   })
   describe('path', () => {
      test(' - a short line', () => {
         const json = toSvg.path({
            d: 'M 10 10 H 90 Z',
            fill: 'red',
            stroke: 'orange',
            'stroke-width': 20
         })
         const actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot()
      })
   })
   describe('composite doc', () => {
      test('many circles', () => {
         const json = toSvg.createSvgObject(
            [toSvg.circle({
               center: {x: 181, y: 191},
               r: 233,
               fill: 'red',
               stroke: 'none'
            }), toSvg.circle({
               center: {x: 181, y: 191},
               r: 233,
               fill: 'red',
               stroke: 'none'
            }), toSvg.circle({
               center: {x: 181, y: 191},
               r: 233,
               fill: 'red',
               stroke: 'none'
            })],
            {x: 1, y: 2},
            {width: 200, height: 250})
         const actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot()
      })
   })
})

