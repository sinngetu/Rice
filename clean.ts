import fs from 'node:fs'

const CACHE_PATH = 'C:\\Users\\server\\AppData\\Local\\Temp'
const PREFIX = 'puppeteer_dev_chrome_profile'

;(async () => {
    const list = fs.readdirSync(CACHE_PATH)
    const dirs = list.filter(name => name.indexOf(PREFIX) === 0)
    let count = 0

    for(const dir of dirs) {
        try {
            fs.rmSync(`${CACHE_PATH}\\${dir}`, {
                maxRetries: 0,
                recursive: true,
                force: true
            })

            count++
        } catch(e) {}
    }

    console.log(`${count} folders have been cleaned!`)
})()
