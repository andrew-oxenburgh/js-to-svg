import {Arc, Point} from './index'

export const moveA = (point: Point | string): string => {
   if (typeof point === 'string') {
      return point
   }
   return `M${point.x},${point.y}`
}
export const moveR = (point: Point): string => {
   return `m${point.x},${point.y}`
}
export const complete = (): string => {
   return 'Z'
}

export function arcA(arc: Arc | string) {
   if (typeof arc === 'string') {
      return arc
   }
   return `A${arc.rx},${arc.ry},${arc.angle},${arc.largeArcFlag},${arc.sweepFlag},${arc.x},${arc.y}`
}

/**
 * Accept an array of points
 * @param points
 */
export function quadraticA(points: Point[]) {
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
