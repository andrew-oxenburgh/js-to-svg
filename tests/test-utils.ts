import {expect} from '@jest/globals'
import {Children} from '../src'

const pd = require('pretty-data').pd
const fs = require('fs')
const toSvg = require('../src')

export function expectSnapshot(json: Children, title: string | null = null) {
   const inputArray: Children = title ? [toSvg.title(title), ...json] : json
   const wrapped: Children = toSvg.createSvgObject(
      {width: 1000, height: 1000},
      inputArray
   )
   const actual: string = toSvg.stringify(wrapped)
   const prettied: string = pd.xml(actual)
   const testname = expect.getState().currentTestName
   const dir = './tests/__out__/'
   const htmlFile = dir + testname.replace(/ /g, '_') + '.html'
   const svgFile = dir + testname.replace(/ /g, '_') + '.svg'

   !fs.existsSync(dir) && fs.mkdirSync(dir)

   fs.existsSync(htmlFile) && fs.unlinkSync(htmlFile)
   fs.writeFileSync(htmlFile, prettied)

   fs.existsSync(svgFile) && fs.unlinkSync(svgFile)
   fs.writeFileSync(svgFile, prettied)

   expect(prettied).toMatchSnapshot()
}
