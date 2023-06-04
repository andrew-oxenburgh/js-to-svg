describe('circle', () => {
   const toSvg = require('./toSvg')()

   describe('rect', () => {
      test('normal method', () => {
         let json = toSvg.rect({
            width: 200,
            height: 200,
            x: 0,
            y: 0,
            fill: 'red',
            stroke: 'none'
         })
         let actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot();
      })
      test('origin and size', () => {
         let json = toSvg.rect({
            origin: {x: 0, y: 1},
            size: {width: 3, height: 7},
            fill: 'red',
            stroke: 'none'
         })
         let actual = toSvg.stringify(json)
         expect(actual).toMatchSnapshot();
      })
   })
   describe('circle', () => {
      test('normal method', () => {
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
      test('accept point as center', () => {
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
});

