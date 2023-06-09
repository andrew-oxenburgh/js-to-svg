'use strict'
import {expectSnapshot} from "./test-utils";
import {Point, Arc, Line} from "../src";

const toSvg = require('../src/index')
describe('fixing-path', () => {
   test('heart', () => {
      let centerLine: Line = {x: 500};
      let bulgeLine: Line = {y: 300}
      let leftLine: Line = {x: 100}
      let rightLine: Line = {x: 900}
      let topLine: Line = {y: 900}
      let startingPoint: Point = {x: 100, ...bulgeLine};

      let dipPoint: Point = {...centerLine, ...bulgeLine};
      let left: Line = {x: 900};

      let leftUpper: Arc = {rx: 200, ry: 200, angle: 0, largeArcFlag: 0, sweepFlag: 1, ...dipPoint};
      let rightUpper: Arc = {...leftUpper, ...left};
      let rightLower: Point[] = [{...rightLine, y: 600}, {...centerLine, ...topLine}];
      let leftLower: Point[] = [{...leftLine, y: 600}, startingPoint];

      let moveTo = toSvg.moveA(startingPoint);
      let arc1 = toSvg.arcA(leftUpper);
      let arc2 = toSvg.arcA(rightUpper)
      let quad1 = toSvg.quadraticA(rightLower);
      let quad2 = toSvg.quadraticA(leftLower);
      let z = toSvg.complete();

      let path = [
         moveTo,
         arc1,
         arc2,
         quad1,
         quad2,
         z
      ];
      const json = [
         toSvg.path({
            id: 'heart',
            d: path.join(''),
            fill: 'red'
         }),
      ]
      expectSnapshot(json, 'complex path')
   })
})
