/* eslint-disable no-console */

const { exec } = require('child_process')
const fs = require('fs')
const inquirer = require('inquirer')
const gitConfig = require('git-config')

const packageData = require('../package.json')
const packageLock = require('../package-lock.json')
const exportsMap = require('../exports-map.js')

const FILES = {
  readme: 'README.md',
  readmeTemplate: 'template-readme.md',
  packageData: 'package.json',
  packageLock: 'package-lock.json',
  exportsMap: 'exports-map.js',
  withLayout: 'src/components/hoc/withLayout.js',
}
const saveJSFile = (file, contents) => fs.writeFileSync(file, `${JSON.stringify(contents, null, '  ')}\n`)

const DEFAULT_THEME_COLOR = '#182036'

const updateSrcFiles = ({pageTitle, themeColor}) => new Promise((resolve, reject) => {
  const withLayout = fs.readFileSync(FILES.withLayout, 'utf8')
  fs.writeFileSync(
    FILES.withLayout,
    withLayout
      .replace('Spark', pageTitle)
      .replace(DEFAULT_THEME_COLOR, themeColor)
  )
  resolve()
})

const removePages = (pages) => {
  pages.map(page => {
    fs.unlinkSync(`pages/${page}.js`)
    delete exportsMap[`/${page}`]
  })
  fs.writeFileSync(
    FILES.exportsMap,
    `module.exports = ${JSON.stringify(exportsMap, null, '  ').replace(/"/g, '\'')}\n`
  )
}

const replacements = [
  {
    find: 'PROJECT-NAME', replace: 'name'
  },
]

const getGitUser = () => new Promise((resolve, reject) => {
  gitConfig((err, config) => {
    if (err) {
      reject(err)
    } else {
      resolve(config.user)
    }
  })
})

const updateProjectFiles = (config) => new Promise(async (resolve, reject) => {
  let readmeFile = fs.readFileSync(FILES.readmeTemplate, 'utf8')
  replacements.map(v => {
    const regex = new RegExp(v.find, 'g')
    readmeFile = readmeFile.replace(regex, config[v.replace])
  })

  const { name, email } = await getGitUser()

  const newPackage = {
    ...packageData,
    name: config.name,
    author: `${name} <${email}>`,
  }
  const newPackageLock = {
    ...packageLock,
    name: config.name,
  }

  fs.writeFileSync(FILES.readme, readmeFile)
  saveJSFile(FILES.packageData, newPackage)
  saveJSFile(FILES.packageLock, newPackageLock)
  fs.unlinkSync(FILES.readmeTemplate)
  resolve()
})

const QUESTIONS = [
  {
    type: 'input',
    name: 'name',
    message: 'Project Name',
    validate: (value) => {
      return value.length > 0 || 'Please enter a project name'
    }
  },
  {
    type: 'input',
    name: 'pageTitle',
    message: 'Page Title',
    default: ({name}) => name,
  },
  {
    type: 'input',
    name: 'themeColor',
    message: 'Theme Color (for PWA)',
    default: DEFAULT_THEME_COLOR,
  },
]

const runTheThing = () => {
  removePages(['about'])

  inquirer.prompt(QUESTIONS).then(async answers => {
    await updateProjectFiles(answers)
    await updateSrcFiles(answers)
    exec(`git add . && git commit -m "feat: setup project ${answers.name}"`, (err, stdout) => {
      if (err) {
        console.log(err)
        process.exit(1)
      } else {
        console.log(`\n${stdout}`)
        console.log(`Project ${answers.name} set up, changes were commited to repo 👆\n`)
      }
    })
  })
}

exec('git status --porcelain', (err, stdout) => {
  if (err) {
    console.log(err)
    process.exit(1)
  } else if (stdout.length) {
    console.log('Please commit or stash changes before proceeding.')
    process.exit()
  } else {
    runTheThing()
  }
})
