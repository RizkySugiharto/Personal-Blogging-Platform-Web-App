<template>
    <div v-if="isAdmin">
        <router-link :to="`/admin/edit/${articleId}`">
            <button class="button-edit me-3">Edit</button>
        </router-link>
        <button class="button-delete me-3" @click="deleteArticle">Delete</button>
    </div>
</template>

<script>
import { getApi } from '@/utils/api'
import { isAdmin } from '@/utils/user';

export default {
    name: 'AdminButtons',
    props: {
        articleId: String
    },
    data() {
        return {
            isAdmin: isAdmin()
        }
    },
    methods: {
        async deleteArticle() {
            try {
                const response = await getApi().delete(`/articles/${this.articleId}`)
                const article = response.data

                this.$logger.debug(article)
                if (!article._id) throw new Error('Something went wrong when deleting the article')

                this.$logger.warn(`Someone has deleted an article with title [${article.title}] on [${new Date()}]`)
                this.$router.replace('/')
            } catch (error) {
                this.$logger.error(error)
            }
        }
    }
}
</script>