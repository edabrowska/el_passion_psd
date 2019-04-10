/* eslint-disable no-console */

const { createServer } = require('http')
const express = require('express')
const compression = require('compression')
const next = require('next')
const nextI18next = require('./i18n')
const nextI18NextMiddleware = require('next-i18next/middleware')

const port = parseInt(process.env.PORT, 10) || 8000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const e = express()
    const server = createServer(e)

    e.use(nextI18NextMiddleware(nextI18next))
    e.use(compression())

    e.get('*', handle)

    server
      .listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
  })
