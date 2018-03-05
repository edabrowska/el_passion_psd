const defaultConfig = {
  user: 'pupper',
  repo: '<repo-url>',
  path: '/home/pupper/<project-name>',
  ssh_options: ['StrictHostKeyChecking=no', 'ForwardAgent=yes'],
  post-deploy: 'npm i && npm run export'
}

module.exports = {
  deploy: {
    staging: {
      ...defaultConfig,
      ref: 'origin/master',
      host: [{
        host: 'stg.int.daftup.com',
        port: '2200'
      }]      
    },
    production: {
      ...defaultConfig
    }
  }
}
