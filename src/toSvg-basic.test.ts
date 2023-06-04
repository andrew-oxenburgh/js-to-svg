const toSvg = require('./toSvg')
test('circle', () => {

   let json = toSvg.createSvgObject([
      toSvg.g([
         toSvg.circle({
            cx: 1000,
            cy: 1000,
            r: 1000,
            fill: 'red',
            stroke: 'none'
         }),
      ])
   ], {x: 0, y: 0}, {width: 2000, height: 2000});

   let output = toSvg.stringify(json)
   expect('a').toBe('b');
});

