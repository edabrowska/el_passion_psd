/* eslint-disable no-console */

const fs = require('fs')
const inquirer = require('inquirer')
const gitConfig = require('git-config')

const packageData = require('../package.json')
const packageLock = require('../package-lock.json')

const FILES = {
  readme: 'README.md',
  readmeTemplate: 'README-template.md',
  packageData: 'package.json',
  packageLock: 'package-lock.json',
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
    ...config,
    author: `${name} <${email}>`,
  }
  const newPackageLock = {
    ...packageLock,
    ...config,
  }

  fs.writeFileSync(FILES.readme, readmeFile)
  fs.writeFileSync(FILES.packageData, JSON.stringify(newPackage, null, '  '))
  fs.writeFileSync(FILES.packageLock, JSON.stringify(newPackageLock, null, '  '))
  fs.unlinkSync(FILES.readmeTemplate)
}

const QUESTIONS = [
  {
    type: 'input',
    name: 'name',
    message: 'Project Name',
    validate: (value) => {
      if (value.length > 0) {
        return true
      }

      return 'Please enter a project name'
    }
  },
]

inquirer.prompt(QUESTIONS).then(answers => {
  updateProjectFiles(answers)
  console.log(`\nProject ${answers.name} set up`)
})
