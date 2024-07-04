<template>
    <div class="container-sm d-flex justify-content-center mt-2 mt-sm-5">
        <form class="form-admin w-100" onsubmit="return false">
            <div class="mb-3">
                <label class="form-label">Insert the key: </label>
                <input class="form-control" type="text" v-model="adminKey" required>
            </div>
            <div class="mb-3">
                <router-link to="/">
                    <button class="button-delete me-3">Back</button>
                </router-link>
                <button class="button-post" type="submit" @click="loginAdmin">Pass</button>
            </div>
        </form>
    </div>
</template>

<script>
import userUtils from '@/utils/user'
import { useUserStore } from '@/stores/user'
import { mapStores } from 'pinia';

export default {
    name: "AdminLoginView",
    data() {
        return {
            adminKey: ""
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    methods: {
        loginAdmin(e) {
            e.preventDefault()

            try {
                if (userUtils.isAdminKeyValid(this.adminKey)) {
                    userUtils.giveAdmin(this.userStore)
                    this.$logger.warn(`User with ID [ ${this.userStore.userId} ] has logged in as [ ADMIN ]`)
                    location.reload()
                }
                
                if (this.adminKey === 'clear') {
                    this.userStore.removeAdmin()
                    this.$logger.warn(`User with ID [ ${this.userStore.userId} has logged out as [ ADMIN ]`)
                    location.reload()
                }
            } catch (error) {
                this.$logger.error(error)
            }
        }
    }
}
</script>