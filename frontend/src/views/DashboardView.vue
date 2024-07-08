<template>
    <div class="container-sm mt-1 mt-sm-3">
        <div v-if="errMsg">
            <h3 class="text-error">{{ errMsg }}</h3>
        </div>
        <div v-else-if="articles.length > 0" class="d-flex flex-wrap justify-content-evenly">
            <ArticleItem
                v-for="article in articles" :key="article._id"
                :articleId="article._id"
                :thumbnail="article.thumbnail"
                :title="article.title"
                :createdAt="article.createdAt"
            />
        </div>
        <div v-else-if="isLoading" class="d-flex justify-content-center">
            <h2>Please wait....</h2>
        </div>
        <div v-else class="d-flex justify-content-center">
            <h2>There are still no articles posted :(</h2>
        </div>
    </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue';
import date from 'date-and-time'
import { getApi } from '@/utils/api'

export default {
    name: 'DashboardBody',
    components: {
        ArticleItem
    },
    data() {
        return {
            isLoading: true,
            articles: [],
            errMsg: ""
        }
    },
    async mounted() {
        try {
            const response = await getApi().get('/articles')
            this.articles = typeof response.data === String ?
                JSON.parse(response.data) :
                response.data
    
            for (const article of this.articles) {
                article.createdAt = date.transform(article.createdAt, process.env.VUE_APP_DATETIME_PARSE, process.env.VUE_APP_DATETIME_FORMAT)
            }
        } catch (error) {
            this.errMsg = error.message
            this.$logger.error(error)
        }

        this.isLoading = false
    }
}
</script>
<style>
    
</style>