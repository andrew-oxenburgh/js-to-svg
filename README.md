# to-svg

## Use JS to create an SVG file.

I needed to create an icon for a project, and I'm much more comfortable with maths than some gui thing, and I love SVG, so I tried to create it using raw SVG, which was... not successful.

I created this templating mechanic that will allow you to create the SVG attributes via JS structures. This would allow me to space and size the components of the icon.

I then realised it might be useful to others, so here it is.

A benefit to this approach, is you can do any maths you need in JS, and then easily transfer it into an SVG. It might not look like much in a small SVG, but over a complex

`to-svg` was built with the backend in mind. I was trying to create an icon by hand, and this sort of came out of it.

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

It also handles animation quite nicely.

![a really ugly animation](./tests/__out__/animation_circle_radius.svg)
