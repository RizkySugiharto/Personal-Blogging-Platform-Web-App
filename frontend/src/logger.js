import { createLogger } from 'vue-logger-plugin'

const isDevelopmentMode = process.env.NODE_ENV === 'development'

const logger = createLogger({
    enabled: true,
    consoleEnabled: isDevelopmentMode,
    level: isDevelopmentMode ? 'debug' : 'error'
})

export default logger