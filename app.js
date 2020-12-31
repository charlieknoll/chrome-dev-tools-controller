require('dotenv').config()
const express = require('express')
const { browserController } = require('./controller')
const asyncHandler = require('express-async-handler')

const app = express()
const hostname = process.env.HOST
const port = process.env.PORT

app.get(
  '/clear-site-data',
  asyncHandler(async function (req, res) {
    await browserController.clearSiteData()
    res.send('Site data cleared')
  }),
)
app.get(
  '/goto',
  asyncHandler(async function (req, res) {
    await browserController.goto(req.query.url)
    res.send(`navigated to: ${req.query.url}`)
  }),
)

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}`)
})
