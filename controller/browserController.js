const pageProvider = require('./pageProvider')
const client = () => pageProvider.client
const page = () => pageProvider.page

const browserController = {
  runSteps: async function (scriptName) {
    //load steps from scriptName file
    //parse steps
  },
  // evaluate: async function (js) {
  //   await page.evaluate()
  // },
  clearSiteData: async function () {
    await client().send('Storage.clearDataForOrigin', {
      origin: process.env.DEBUG_ORIGIN,
      storageTypes:
        'appcache,cache_storage,cookies,indexeddb,local_storage,service_workers,websql',
    })
  },
  loadScript: async function () {},
  reload: async function () {},
  waitFor: async function () {},
  enableNetwork: async function () {},
  disableNetwork: async function () {},
  goto: async function (url, waitUntil = 'load') {
    try {
      await page().goto(url, { waitUntil: waitUntil })
    } catch (e) {
      console.log('goto error: ', e)
    }
  },
}

module.exports = browserController
