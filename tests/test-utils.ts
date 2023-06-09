import {expect} from "@jest/globals";
const pd = require('pretty-data').pd
const fs = require('fs')
const toSvg = require('../src')

export function testUtils(json: object, title: string | null = null) {
   const inputArray = title ? [toSvg.title(title), json] : [json]
   const wrapped = toSvg.createSvgObject(
      {width: 1000, height: 1000},
      inputArray
   )
   let actual = toSvg.stringify(wrapped)
   actual = pd.xml(actual)
   const testname = expect.getState().currentTestName
   const dir = './tests/__out__/'
   const htmlFile = dir + testname.replace(/ /g, '_') + '.html'
   const svgFile = dir + testname.replace(/ /g, '_') + '.svg'

   !fs.existsSync(dir) && fs.mkdirSync(dir)
   fs.existsSync(htmlFile) && fs.unlinkSync(htmlFile)
   fs.writeFileSync(htmlFile, actual)
   fs.existsSync(svgFile) && fs.unlinkSync(svgFile)
   fs.writeFileSync(svgFile, actual)

   expect(actual).toMatchSnapshot()
}
