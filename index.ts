import * as model from './model'
import overseas from './overseas'
import daddy from './daddy'
// import BigNews from './BigNews'

(async () => {
    const overseasNews = await overseas()
    await model.news.saveNews(overseasNews)
    console.log(`\nadd ${overseasNews.length} overseas news`)

    const daddyInfo = await daddy()
    await model.daddy.saveInfo(daddyInfo)
    console.log(`add ${daddyInfo.length} daddy info\n`)

    await model.close()
    // BigNews(news)
    process.exit(0)
})()
