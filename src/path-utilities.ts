import {Arc, Point} from './index'

export function moveA(point: Point | string): string {
   if (typeof point === 'string') {
      return point
   }
   return `M${point.x},${point.y}`
}

export function moveR(point: Point | string): string {
   if (typeof point === 'string') {
      return point
   }
   return `m${point.x},${point.y}`
}

export function complete(): string {
   return 'Z'
}

export function arcA(arc: Arc | string): string {
   if (typeof arc === 'string') {
      return arc
   }
   return `A${arc.rx},${arc.ry},${arc.angle},${arc.largeArcFlag},${arc.sweepFlag},${arc.x},${arc.y}`
}

/**
 * Accept an even numbered length of an array of points, or a string which passes straight through it
 * @param points
 */
export function quadraticA(points: Point[] | string): string {
   if (typeof points === 'string') {
      return points
   }
   if (points.length < 1) {
      return ''
   }
   if (points.length % 2) {
      throw 'Quadratic Error: requires an even number of points'
   }
   const res = 'Q' + points.reduce((acc: string, point: Point) => {
      acc += `${point.x},${point.y} `
      return acc
   }, '')
   const removeTrailingComma = res.slice(0, res.length - 1)
   return removeTrailingComma
}
