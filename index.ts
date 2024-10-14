import * as model from './model'
import overseas from './overseas'
import inland from './inland'
import boss from './boss'

const MINUTE = 1000 * 60

const run = async () => {
    try {
        await Promise.all([
            overseas(),
            inland(),
            boss()
        ])
    } catch(e) {
        await model.close()
        throw e
    }
}

run()
setInterval(run, 15 * MINUTE)