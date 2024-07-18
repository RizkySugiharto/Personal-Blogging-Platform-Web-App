<template>
    <div class="container-sm mt-2 mt-sm-4">
        <form class="form-admin" onsubmit="return false">
            <div class="mb-3">
                <label class="form-label">Title: </label>
                <input type="text" class="form-control" v-model="title" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Thumbnail: </label>
                <input type="file" class="form-control" ref="thumbnail" @change="onThumbnailChanged" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Content (markdown):</label>
                <textarea class="form-control" cols="30" rows="10" v-model="content" required></textarea>
            </div>
            <div class="mb-3">
                <button type="submit" class="button-post" @click="postArticle">Post</button>
            </div>
        </form>
    </div>
</template>

<script>
import { getApi } from '@/utils/api';
import { isAdmin } from '@/utils/user';

export default {
    name: 'AdminPostView',
    data() {
        return {
            title: "",
            thumbnail: null,
            content: "",
            isAdmin: isAdmin()
        }
    },
    mounted() {
        if (!this.isAdmin) this.$router.replace('/', { query: { adminKey: 'clear' } })
    },
    methods: {
        onThumbnailChanged() {
            this.thumbnail = this.$refs.thumbnail.files[0]
            
            this.$log.debug({
                title: this.title,
                thumbnail: this.thumbnail,
                content: this.content
            })
        },
        async postArticle() {
            try {
                const response = await getApi().post('/articles', {
                    title: this.title,
                    thumbnail: this.thumbnail,
                    content: this.content
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                const article = response.data

                this.$logger.debug(article)
                if (!article._id) throw new Error("Something went wrong")

                this.$logger.warn(`Someone has added a new article with id [ ${article._id} ]`)
                this.$router.replace('/')
            } catch (error) {
                this.$logger.error(error)
            }
        }
    }
}
</script>