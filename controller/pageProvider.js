const puppeteer = require('puppeteer-core')

const pageProvider = {
  client: null,
  page: null,
  connect: async function () {
    const cdpUrl = 'http://' + process.env.CDP_HOST + ':' + process.env.CDP_PORT
    let browser
    try {
      browser = await puppeteer.connect({
        browserURL: cdpUrl,
        defaultViewport: null,
      })
    } catch (e) {
      if (!browser)
        throw new Error(
          `Could not connect to ${cdpUrl}. Make sure all chrome.exe instances are closed so that chrome can start with remote debugging enabled.`,
        )
    }

    const origin = process.env.DEBUG_ORIGIN
    const pages = await browser.pages()

    for (var i = 0; i < pages.length; i++) {
      if (pages[i].url().startsWith(origin)) {
        this.page = pages[i]
      }
    }
    if (!this.page) {
      throw new Error(
        `Could not connect to ${origin}. Make sure all chrome.exe instances are closed so that chrome can start with remote debugging enabled.`,
      )
    }

    this.client = await this.page.target().createCDPSession()
  },
  init: async function () {
    try {
      await this.connect()
    } catch (e) {
      console.error('error connecting, exiting: ', e)
      console.log(
        'TIP: Make sure all chrome.exe instances are closed so that chrome can start with remote debugging enabled.',
      )
      process.exit()
    }
  },
}
pageProvider.init()

//wait for client and page

module.exports = pageProvider
