import { useUserStore } from "@/stores/user"

function isAdminKeyValid(key) {
    return key === process.env.VUE_APP_ADMIN_KEY
}

function giveAdmin(userStore) {
    userStore.adminKey = process.env.VUE_APP_ADMIN_KEY
    return userStore
}

function isAdmin() {
    const userStore = useUserStore()
    return userStore.adminKey === process.env.VUE_APP_ADMIN_KEY
}

export default { isAdminKeyValid, giveAdmin, isAdmin }
export { isAdminKeyValid, giveAdmin, isAdmin }