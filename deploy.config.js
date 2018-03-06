// if pasting repo url from gitlab, replace `:` with `/`
// e.g. ssh://git@gitlab.int.daftup.com/daftup/frontend/spark.git

const defaultConfig = {
  user: 'pupper',
  repo: '<repo-url>',
  path: '/home/pupper/<project-name>',
  ssh_options: ['StrictHostKeyChecking=no', 'ForwardAgent=yes'],
  'post-deploy': 'npm i && npm run export'
}

module.exports = {
  deploy: {
    staging: {
      ...defaultConfig,
      ref: 'origin/staging',
      host: [{
        host: 'stg.int.daftup.com',
        port: '2200'
      }]
    },
    production: {
      ref: 'origin/master',
      host: [{
        host: 'production.com',
        port: '2200'
      }],
      ...defaultConfig
    }
  }
}
