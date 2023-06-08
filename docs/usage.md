### The smallest fragment that'll create a fragment

```js
const toSvg = require('to-svg')

const square = {x:0, y:0, side:100}
const circle = toSvg.circle({square, fill:'yellow'})
let actual = toSvg.stringify(circle)
```

You can wrap an array of elements under an svg wrapper.
You will need to provide a width and height.

```js
const toSvg = require('to-svg')

const square = {x:0, y:0, side:100}
const circle = toSvg.circle({square, fill:'yellow'})
const wrapped = toSvg.createSvgObject(
   {width: 1000, height: 1000},
   [circle]
)
let actual = toSvg.stringify(wrapped)
```

### Use the `elem` call, to create any currently undefined element

(Yes, I could use prototyping to do this, and maybe I will)

You can create any element using the `elem` call.
```ts
function elem(name: string, attribs: object, children: object[]) {
}
// for example
toSvg.elem('circle', {cx: 100, cy: 100, r: 50, fill: 'yellow'})
toSvg.elem('polygon', {points: '100,100 150,25 150,75 200,0', fill: 'yellow', stroke: 'black'})
```

### Some syntactic sugar, to make things a bit easier

I have provided some alternative methods of passing in boundaries.

For instance, A circle will accept the usual `{cx, cy, r}`, or` {center:{x, y}, r}`, or a bounding square `{square:{x, y, side}`

For example, a circle could be defined in any of these ways:

```js
    toSvg.elem('circle', {cx: 100, cy: 100, r: 50, fill: 'yellow'})
    toSvg.circle({cx: 100, cy: 100, r: 50, fill: 'yellow'})
    toSvg.circle({center: {x: 100, y:100}, r: 50, fill: 'yellow'})
    toSvg.circle({square: {x: 50, y:50, side:100}, fill: 'yellow'})
```

I have saved all the output from my jest tests, so you can see the output here.

[examples from jest tests](tests/__out__)
