# js-to-svg

Use JS to create an SVG file. Will also accept JSON.

Given a program such:

```js
const json = toSvg.createSvgObject([
   toSvg.circle({
      cx: 50,
      cy: 50,
      r: 50,
      fill: 'red',
      stroke: 'none'
   }),
], {width: 100, height: 100})

const svgDoc = toSvg.stringify(json)
```

generates XML like this:

```SVG
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1">
   <circle fill="red" cx="50" cy="50" r="50" stroke="none"/>
</svg>
```

and a file that looks like this:

![a simple circle described using js](./out/circle.svg)
