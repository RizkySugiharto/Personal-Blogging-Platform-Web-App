<template>
    <nav class="navbar bg-primary border-bottom border-3 border-tertiary">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand my-1 ms-3 h1 text-decoration-none">
            Lemonz Dev
            </router-link>
            <div v-if="isAdmin">
                <router-link to="/admin/post">
                    <button class="button-create d-flex align-items-center justify-content-center" style="width: 30px; height: 30px;">
                        <img src="@/assets/img/button-create.svg" width="12px">
                    </button>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import { isAdmin } from '@/utils/user';

export default {
    name: 'NavigationBar',
    data() {
        return {
            isAdmin: isAdmin()
        }
    }
}
</script>

<style>
</style>