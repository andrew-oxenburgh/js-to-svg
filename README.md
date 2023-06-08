# to-svg

Use JS to create an SVG file.

[why](docs/why.md)
[usage](docs/usage.md)

A benefit to this approach, is you can do any maths you need in JS, and then easily transfer it into an SVG. It might not look like much in a small SVG, but over a complex

I designed to-svg with the backend in mind. I was trying to create an icon by hand, and this sort of came out of it.

I added some shortcuts, so you can create a circle using cx, cy, and r as specified, but you can also pass in a bounding square, or a center point and radius which might save you some maths if you need to calc the same thing multiple times.

### example
For example, given a program such as:

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

