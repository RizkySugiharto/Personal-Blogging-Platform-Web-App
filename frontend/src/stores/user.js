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
        regenerateUserId() {
            this.userId = uuidv7()
        },
        removeAdmin() {
            this.adminKey = ""
        }
    },
    persist: true
})