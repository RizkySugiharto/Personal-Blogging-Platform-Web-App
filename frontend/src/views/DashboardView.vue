<template>
    <div class="container-sm mt-3">
        <div v-if="errMsg">
            <h3 class="text-error">{{ errMsg }}</h3>
        </div>
        <div v-else-if="articles.length > 0">
            <div class="bg-primary border border-tertiary border-3 d-flex flex-wrap">
                <button class="button-filter" data-bs-toggle="modal" data-bs-target="#filter-by-date-modal">Filter By Date</button>
            </div>
            <div class="d-flex flex-wrap justify-content-evenly">
                <ArticleItem
                v-for="article in articles" :key="article._id"
                :articleId="article._id"
                :thumbnail="article.thumbnail"
                :title="article.title"
                :createdAt="article.createdAt"
                />
            </div>
        </div>
        <div v-else-if="isLoading" class="d-flex justify-content-center">
            <h2>Please wait....</h2>
        </div>
        <div v-else-if="isFilterNone">
            <div class="bg-primary border border-tertiary border-3 d-flex flex-wrap">
                <button class="button-filter" data-bs-toggle="modal" data-bs-target="#filter-by-date-modal">Filter By Date</button>
            </div>
            <h2 class="mt-4 text-center">The result of filtering is nothing :(</h2>
        </div>
        <div v-else class="d-flex justify-content-center">
            <h2>There are still no articles posted :(</h2>
        </div>
        <div id="modals">
            <div class="modal fade" id="filter-by-date-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Filter By Date</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form class="form-filter" :onsubmit="submitFilterByDate">
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label class="form-label">From: </label>
                                    <input type="date" class="form-control" name="from">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">To: </label>
                                    <input type="date" class="form-control" name="to">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit">Filter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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
            refresh: false,
            isLoading: true,
            isFilterNone: false,
            articles: [],
            errMsg: ""
        }
    },
    async mounted() {
        try {
            await this.$router.isReady()

            this.$logger.debug(this.$route.query.filterByDate)

            const filterByDate = this.$route.query.filterByDate ?
                `?filterByDate=${this.$route.query.filterByDate}` : ''

            const response = await getApi().get('/articles' + filterByDate)
            this.articles = typeof response.data === String ?
                JSON.parse(response.data) :
                response.data

            if (filterByDate && this.articles.length < 1) {
                this.isFilterNone = true
            }
    
            for (const article of this.articles) {
                article.createdAt = date.transform(article.createdAt, process.env.VUE_APP_DATETIME_PARSE, process.env.VUE_APP_DATETIME_FORMAT)
            }
        } catch (error) {
            this.errMsg = error.message
            this.$logger.error(error)
        }

        this.isLoading = false
    },
    methods: {
        submitFilterByDate(e) {
            e.preventDefault()
            this.$logger.debug(e)

            const formDateFormat = 'YYYY-MM-DD'
            const filterDateFormat = 'DD-MM-YYYY'
            const fromInput = date.transform(e.target[0].value, formDateFormat, filterDateFormat)
            const toInput = date.transform(e.target[1].value, formDateFormat, filterDateFormat)

            this.$logger.debug(fromInput)
            this.$logger.debug(toInput)

            const filterValue = `from ${fromInput} to ${toInput}`
            location.assign(`/?filterByDate=${filterValue}`)
        }
    }
}
</script>
<style>
    
</style>