import { defineStore } from "pinia"
import { v7 as uuidv7 } from "uuid"

export const useUserStore = defineStore('user', {
    state() {
        return {
            userId: uuidv7(),
            adminKey: ""
        }
    },
    actions: {
        removeAdmin() {
            this.adminKey = ""
        }
    },
    persist: true
})