import dayjs from 'dayjs'
import hotlist, { UpdateWeiboList } from './hotlist/'
import * as model from './model'

setInterval(async () => {
    try {
        const data = await hotlist()
        const current = dayjs().format('YYYY-MM-DD HH:mm:ss')
    
        await model.hotlist.saveContent(data)
        await UpdateWeiboList()
    
        console.log(`add ${data.length} records ${current}`)
    } catch (e) {
        console.error('failed to catch hotlists!', e)
    }
}, 60000)

process.on('exit', async () => await model.close())
