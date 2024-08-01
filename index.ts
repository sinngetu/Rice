import * as model from './model'
import overseas from './overseas'
import inland from './inland'
import daddy from './daddy'
// import BigNews from './BigNews'

(async () => {
    await overseas()

    try {
        const daddyInfo = await daddy()
        await model.daddy.saveInfo(daddyInfo)
        console.log(`add ${daddyInfo.length} daddy info\n`)
    } catch(e) {}

    await model.close()
    // BigNews(news)
    process.exit(0)
})()
