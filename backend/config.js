const dotenv = require('dotenv')
const ENV_DIR = 'env/'

function loadConfig(isLocalMode) {
    dotenv.config({
        path: ENV_DIR + '.env',
        override: false
    })

    if (process.env.NODE_ENV === 'development') {
        dotenv.config({
            path: ENV_DIR + '.env.dev' + (isLocalMode ? '.local' : ''),
            override: true
        })
    } else {
        dotenv.config({
            path: ENV_DIR + '.env.prod' + (isLocalMode ? '.local' : ''),
            override: true
        })
    }
}

module.exports.loadConfig = loadConfig