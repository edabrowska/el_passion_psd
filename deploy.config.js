const sharedConfig = {
  user: 'pupper',
  ref: 'origin/master',
  repo: 'ssh://git@gitlab.int.daftup.com:daftup/frontend/spark.git',
  path: '/home/pupper/spark',
  ssh_options: ['StrictHostKeyChecking=no', 'ForwardAgent=yes'],
  'post-deploy': 'npm i && npm run export',
}

module.exports = {
  deploy: {
    staging: {
      host: [
        {
          'host': 'spark.int.daftup.com',
          'port': '2200'
        }
      ],
      ...sharedConfig,
    },
    production: {
      host: [
        {
          'host': 'spark.int.daftup.com',
          'port': '2200'
        }
      ],
      ...sharedConfig,
    }
  }
}
