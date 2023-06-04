const s = require('./sum');
// import sum from './sum'

// function sum(a, b): number{
//    return a + b
// }
test('adds 1 + 2 to equal 3', () => {
   expect(s.sum(1, 2)).toBe(3);
});

