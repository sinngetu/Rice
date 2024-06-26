import weibo from './weibo'
import zhihu from './zhihu'
import douyin from './douyin'
import baidu from './baidu'
import toutiao from './toutiao'

import * as model from '../model'
import { HotItem } from './interface'

export { UpdateWeiboList } from './weibo'
export default async () => {
    const data: HotItem[] = (await Promise.all([
        weibo(),
        zhihu(),
        douyin(),
        baidu(),
        toutiao(),
    ])).flat()

    const existHash = (await model.hotlist.getList.ByHash(data.reduce((result, item) => result.concat(item.hash), ([] as string[]))) as HotItem[]).map(i => i.hash)

    return data.filter(({ hash }) => {
        if (existHash.includes(hash)) return false
        else {
            existHash.push(hash)
            return true
        }
    })
}
