describe('svg', () => {
   const toSvg = require('./toSvg')()

   describe('rect', () => {
      test(' - svg standard', () => {
         let json = toSvg.rect({
            width: 33,
            height: 44,
            x: 0,
            y: 1,
            fill: 'red',
            stroke: 'none'
         })
         let actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot();
      })
      test(' - using origin and size', () => {
         let json = toSvg.rect({
            origin: {x: 0, y: 1},
            size: {width: 3, height: 7},
            fill: 'red',
            stroke: 'none'
         })
         let actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot();
      })
      test(' - using a rect', () => {
         let json = toSvg.rect({
            rect: {x: 1, y: 2, width:100, height: 200},
            fill: 'red',
            stroke: 'none'
         })
         let actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot();
      })
   })
   describe('circle', () => {
      test(' - svg', () => {
         let json = toSvg.circle({
            cx: 100,
            cy: 150,
            r: 165,
            fill: 'red',
            stroke: 'none'
         });
         let actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot();
      });
      test(' - using a point', () => {
         let json = toSvg.circle({
            center: {x: 181, y: 191},
            r: 233,
            fill: 'red',
            stroke: 'none'
         });
         let actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot();
      });
   });

   describe('doc', () => {
      test('empty doc', () => {
         let json = toSvg.createSvgObject(
            [],
            {x: 1, y: 2},
            {width: 200, height: 250});
         let actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot();
      });
   });
   describe('composite doc', () => {
      test('many circles', () => {
         let json = toSvg.createSvgObject(
            [toSvg.circle({
               center: {x: 181, y: 191},
               r: 233,
               fill: 'red',
               stroke: 'none'
            }),toSvg.circle({
               center: {x: 181, y: 191},
               r: 233,
               fill: 'red',
               stroke: 'none'
            }),toSvg.circle({
               center: {x: 181, y: 191},
               r: 233,
               fill: 'red',
               stroke: 'none'
            })],
            {x: 1, y: 2},
            {width: 200, height: 250});
         let actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot();
      });
   });
});

