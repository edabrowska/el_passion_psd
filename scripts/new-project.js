/* eslint-disable no-console */

const { exec } = require('child_process')
const fs = require('fs')
const inquirer = require('inquirer')

const packageData = require('../package.json')
const exportsMap = require('../exports-map.js')

const FILES = {
  readme: 'README.md',
  readmeTemplate: 'template-readme.md',
  packageData: 'package.json',
  exportsMap: 'exports-map.js',
  document: 'pages/_document.js',
  gitLabCI: '.gitlab-ci.yml',
}
const saveJSFile = (file, contents) => fs.writeFileSync(file, `${JSON.stringify(contents, null, '  ')}\n`)

const updateSrcFiles = ({pageTitle}) => new Promise((resolve, reject) => {
  const document = fs.readFileSync(FILES.document, 'utf8')
  fs.writeFileSync(
    FILES.document,
    document
      .replace('Spark', pageTitle)
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

const updateProjectFiles = (config) => new Promise(async (resolve, reject) => {
  let readmeFile = fs.readFileSync(FILES.readmeTemplate, 'utf8')
  replacements.map(v => {
    const regex = new RegExp(v.find, 'g')
    readmeFile = readmeFile.replace(regex, config[v.replace])
  })

  const newPackage = {
    ...packageData,
    name: config.name
  }

  const newGitLabCI = fs.readFileSync(FILES.gitLabCI, 'utf8').replace(/project-name/g, config.name)

  fs.writeFileSync(FILES.gitLabCI, newGitLabCI)
  fs.writeFileSync(FILES.readme, readmeFile)
  saveJSFile(FILES.packageData, newPackage)
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
