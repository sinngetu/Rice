import * as model from './model'
import overseas from './overseas'
// import inland from './inland'
import daddy from './daddy'

const MINUTE = 1000 * 60

const run = async () => {
    try {
        await overseas()
        await daddy()
    } catch(e) {
        await model.close()
        throw e
    }
}

run()
setInterval(run, 15 * MINUTE)