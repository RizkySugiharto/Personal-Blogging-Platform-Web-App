import { useUserStore } from '@/stores/user'
import axios from 'axios'

function getApi() {
    const userStore = useUserStore()
    const api = axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URI,
        headers: {
            'X-Api-Key': process.env.VUE_APP_BACKEND_API_KEY,
            'X-User-ID': userStore.userId
        }
    })

    return api
}

export default { getApi }
export { getApi }