'use strict'

const u = require('../toSvg').pathUtils

interface Test {
   name: string
   actual: () => string
   expected: string
}

function batchTests(tests: Test[]) {
   tests.forEach(value =>
      test(value.name, () => expect(value.actual()).toEqual(value.expected))
   )
}

describe('moveTo absolute', () => {
   test('move', () => {
      expect(u.complete()).toEqual('Z')
   })
})
describe('moveTo', () => {
   batchTests([
      {name: 'moveA', actual: () => u.moveA({x: 3, y: 4}), expected: 'M3,4'},
      {name: 'moveR', actual: () => u.moveR({x: 3, y: 4}), expected: 'm3,4'},
      {name: 'moveA accepts string', actual: () => u.moveR('ddd'), expected: 'ddd'},
      {name: 'moveB accepts string', actual: () => u.moveA('ddd'), expected: 'ddd'},
   ])
})
describe('arc', () => {
   batchTests([
      {
         name: 'arcA with parameter', actual: () => u.arcA({
            rx: 7,
            ry: 11,
            angle: 1,
            largeArcFlag: 1,
            sweepFlag: 1,
            x: 53,
            y: 57
         }), expected: 'A7,11,1,1,1,53,57'
      },
      {name: 'arcA accepts string', actual: () => u.arcA('ddd'), expected: 'ddd'},
   ])
})
describe('quadratic', () => {
   batchTests([
      {name: 'no points returns empty', actual: () => u.quadraticA([]), expected: ''},
      {name: 'string returns string', actual: () => u.quadraticA('dddddddd'), expected: 'dddddddd'},
      {name: 'zero points returns empty', actual: () => u.quadraticA([]), expected: ''},
      {name: 'even number of points good (2)', actual: () => u.quadraticA([{x: 7, y: 11}, {x: 7, y: 11}]), expected: 'Q7,11 7,11'},
      {name: 'even number of points good (4)', actual: () => u.quadraticA([{x: 7, y: 11}, {x: 7, y: 11},{x: 7, y: 11}, {x: 7, y: 11}]), expected: 'Q7,11 7,11 7,11 7,11'},
   ])
   describe('odd number of points throws exception', () => {
      test('odd number of points bad (1)', () => {
         expect(
            () => u.quadraticA([{x: 7, y: 11}])
         ).toThrowError('Quadratic Error: requires an even number of points')
      })
      test('odd number of points bad (3)', () => {
         expect(
            () => u.quadraticA([{x: 7, y: 11}, {x: 7, y: 11}, {x: 7, y: 11}])
         ).toThrowError('Quadratic Error: requires an even number of points')
      })
   })
})
