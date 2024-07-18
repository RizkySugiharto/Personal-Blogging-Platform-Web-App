import { useUserStore } from '@/stores/user'
const { validate: uuidValidate } = require('uuid')
const { version: uuidVersion } = require('uuid')
import axios from 'axios'

function getApi() {
    const userStore = useUserStore()
    if (!(uuidValidate(userStore.userId) && uuidVersion(userStore.userId) === 7)) {
        userStore.regenerateUserId()
    }
    
    const api = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL,
        headers: {
            'X-User-ID': userStore.userId
        }
    })

    return api
}

export default { getApi }
export { getApi }