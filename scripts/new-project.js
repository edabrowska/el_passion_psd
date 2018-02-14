/* eslint-disable no-console */

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
const saveJSFile = (file, contents) => fs.writeFileSync(file, JSON.stringify(contents, null, '  '))

const updateSrcFiles = ({pageTitle}) => {
  const withLayout = fs.readFileSync(FILES.withLayout, 'utf8')
  fs.writeFileSync(
    FILES.withLayout,
    withLayout.replace('Spark', pageTitle)
  )
}

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

const updateProjectFiles = async (config) => {
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
}

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
]

removePages(['about'])

inquirer.prompt(QUESTIONS).then(answers => {
  updateProjectFiles(answers)
  updateSrcFiles(answers)
  console.log(`\nProject ${answers.name} set up`)
})
