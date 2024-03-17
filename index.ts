import * as model from './model'
import overseas from './overseas'
import inland from './inland'
import daddy from './daddy'
// import BigNews from './BigNews'

(async () => {
    await Promise.all([
        (async () => {
            const overseasNews = await overseas()
            await model.news.saveNews(overseasNews)
            console.log(`\nadd ${overseasNews.length} overseas news`)
        })(),

        (async () => {
            const inlandNews = await inland()
            await model.news.saveNews(inlandNews)
            console.log(`\nadd ${inlandNews.length} inland news`)
        })(),

        (async () => {
            const daddyInfo = await daddy()
            await model.daddy.saveInfo(daddyInfo)
            console.log(`add ${daddyInfo.length} daddy info\n`)
        })()
    ])

    await model.close()
    // BigNews(news)
    process.exit(0)
})()
