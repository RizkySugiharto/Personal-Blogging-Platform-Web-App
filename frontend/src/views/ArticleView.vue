<template>
    <div class="container pt-sm-4 pt-3" style="max-width: 768px">
        <div v-if="errMsg">
            <h3 class="text-error">{{ errMsg }}</h3>
        </div>
        <div v-else-if="article._id" class="article-detail">
            <AdminButtons :articleId="this.$route.params.id"/>
            <h1 class="m-0 mt-2 fw-bold">{{ article.title }}</h1>
            <h6 class="m-0 mt-2 mb-4">{{ article.createdAt }}</h6>
            <img :src="article.thumbnail" class="w-100 border border-tertiary border-3">
            <div class="my-4 article-detail-content" v-html="article.content"></div>
        </div>
        <div v-else-if="isLoading">
            <p class="text-center mt-4 fs-4">Please wait...</p>
        </div>
        <div v-else>
            <p class="text-center mt-4 fs-4">Article Not Found :(</p>
        </div>
    </div>
</template>

<script>
import showdown from 'showdown';
import date from 'date-and-time'
import { getApi } from '@/utils/api'
import AdminButtons from '@/components/AdminButtons.vue';
import { isAdmin } from '@/utils/user';

export default {
    components: {
        AdminButtons
    },
    data() {
        return {
            isLoading: true,
            article: {},
            errMsg: "",
            isAdmin: isAdmin()
        }
    },
    async mounted() {
        try {
            const response = await getApi().get(`/articles/${this.$route.params.id}`)
            const contentConverter = new showdown.Converter({
                openLinksInNewWindow: true
            })

            this.article = typeof response.data === String ?
                JSON.parse(response.data) :
                response.data
            this.article.content = contentConverter.makeHtml(
                this.article.content
            )
            this.article.createdAt = date.transform(
                this.article.createdAt,
                process.env.VUE_APP_DATETIME_PARSE,
                process.env.VUE_APP_DATETIME_FORMAT
            )
            this.isLoading = false
        } catch (error) {
            this.errMsg = error.message
            this.$logger.error(error)

            this.isLoading = false
        }

        this.$logger.debug(this.article)
    }
}
</script>

<style>

</style>