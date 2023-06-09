'use strict'

const u = require('../src/index').pathUtils
describe('moveTo', () => {
   test('move absolute', () => {
      const expected = 'M3,4'
      const actual = u.moveA({x: 3, y: 4})
      expect(actual).toEqual(expected)
   })
   test('string accepts string', () => {
      const expected = 'eee'
      const actual = u.moveA(expected)
      expect(actual).toEqual(expected)
   })
})

describe('quadratic', () => {
   const point1 = {x: 7, y: 11}
   test('no points returns empty', () => {
      const actual = u.quadraticA([])
      const expected = ''
      expect(actual).toEqual(expected)
   })
   test('string returns string', () => {
      const actual = u.quadraticA('dddddddd')
      const expected = 'dddddddd'
      expect(actual).toEqual(expected)
   })
   describe('require even numbers of points', () => {
      test('zero points returns empty', () => {
         const actual = u.quadraticA([])
         const expected = ''
         expect(actual).toEqual(expected)
      })
      test('even number of points good (2)', () => {
         const actual = u.quadraticA([point1, point1])
         const expected = 'Q7,11 7,11'
         expect(actual).toEqual(expected)
      })
      test('even number of points good (4)', () => {
         const actual = u.quadraticA([point1, point1, point1, point1])
         const expected = 'Q7,11 7,11 7,11 7,11'
         expect(actual).toEqual(expected)
      })
      test('odd number of points bad (1)', () => {
         expect(
            () => u.quadraticA([point1])
         ).toThrowError('Quadratic Error: requires an even number of points')
      })
      test('odd number of points bad (3)', () => {
         expect(
            () => u.quadraticA([point1, point1, point1])
         ).toThrowError('Quadratic Error: requires an even number of points')
      })
   })
})
