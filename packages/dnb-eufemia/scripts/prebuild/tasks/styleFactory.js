/**
 * Insert all the component styles into the main styles lib file
 *
 */

import fs from 'fs-extra'
import globby from 'globby'
import path, { basename } from 'path'
import prettier from 'prettier'
import { ErrorHandler, log } from '../../lib'

const prettierrc = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../.prettierrc'), 'utf-8')
)

const runStyleFactory = async () => {
  log.start('> PrePublish: Starting the style factory ...')

  const processToNamesIgnoreList = [
    '!**/__tests__/',
    '!**/stories/',
    '!**/web-components/',
    '!**/style/',
    '!**/helper-classes/',
    '!**/*_not_in_use/',
  ]

  // components
  await runFactory({
    scssOutputFile: path.resolve(
      __dirname,
      '../../../src/style/dnb-ui-components.scss'
    ),
    customContent: `
@import './core/utilities.scss';
@import './dnb-ui-fragments.scss';
`,
    scssTemplateToFill: `@import '../components/{name}/style/_{name}.scss';`,
    processToNamesList: [
      path.resolve(__dirname, '../../../src/components/*'),
    ].concat(processToNamesIgnoreList),
    processOnlyList: [
      path.resolve(__dirname, '../../../src/components/**/style/*.scss'),
    ],
  }).then(() => {
    if (require.main === module) {
      log.succeed(
        '> PrePublish: "styleFactory" Created the style file with all the components'
      )
    }
  })

  // fragments
  await runFactory({
    scssOutputFile: path.resolve(
      __dirname,
      '../../../src/style/dnb-ui-fragments.scss'
    ),
    customContent: `
@import './core/utilities.scss';
`,
    scssTemplateToFill: `@import '../fragments/{name}/style/_{name}.scss';`,
    processToNamesList: [
      path.resolve(__dirname, '../../../src/fragments/*'),
    ].concat(processToNamesIgnoreList),
    processOnlyList: [
      path.resolve(__dirname, '../../../src/fragments/**/style/*.scss'),
    ],
  }).then(() => {
    if (require.main === module) {
      log.succeed(
        '> PrePublish: "styleFactory" Created the style file with all the fragments'
      )
    }
  })

  // extensions
  await runFactory({
    scssOutputFile: path.resolve(
      __dirname,
      '../../../src/style/dnb-ui-extensions.scss'
    ),
    customContent: `
@import './core/utilities.scss';
`,
    scssTemplateToFill: `@import '../extensions/{name}/style/_{name}.scss';`,
    processToNamesList: [
      path.resolve(__dirname, '../../../src/extensions/*'),
    ].concat(processToNamesIgnoreList),
    processOnlyList: [
      path.resolve(__dirname, '../../../src/extensions/**/style/*.scss'),
    ],
  }).then(() => {
    if (require.main === module) {
      log.info('> Created the style file with all the extensions')
    }
  })
}

const autoAdvice =
  '/**\n * ATTENTION: This file is auto generated by using "styleFactory".\n * Do not change the content!\n *\n */\n\n'

const runFactory = async ({
  scssOutputFile,
  scssTemplateToFill,
  processToNamesList,
  processOnlyList = null,
  customContent = '',
  onlyDirectories = true,
}) => {
  try {
    processToNamesList = await globby(processToNamesList, {
      onlyDirectories,
    })
    processToNamesList.sort()
    if (processOnlyList) {
      const processedList = await globby(processOnlyList)
      processToNamesList = processToNamesList.filter((source) =>
        processedList.some((file) => file.indexOf(source) !== -1)
      )
    }
  } catch (e) {
    log.fail(e)
  }

  processToNamesList = processToNamesList.map((source) => ({
    source,
    name: basename(source),
  }))

  const content = processToNamesList
    .reduce((acc, { name }) => {
      acc.push(scssTemplateToFill.replace(new RegExp('{name}', 'g'), name))
      return acc
    }, [])
    .join('\n')

  try {
    // make sure we have newline at the end - because of StyleLint "no-missing-end-of-source-newline"
    await fs.writeFile(
      scssOutputFile,
      prettier.format(`${autoAdvice}${customContent}${content}\n`, {
        ...prettierrc,
        filepath: scssOutputFile,
      })
    )
  } catch (e) {
    log.fail(`There was an error on creating ${scssOutputFile}!`)
    new ErrorHandler(e)
  }
}

if (require.main === module && process.env.NODE_ENV !== 'test') {
  log.start()
  runStyleFactory().then(() => {
    log.succeed()
  })
}

export { runStyleFactory }
