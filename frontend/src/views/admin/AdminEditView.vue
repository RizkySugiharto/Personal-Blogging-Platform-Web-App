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
                <button type="submit" class="button-post" @click="saveArticle">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import { getApi } from '@/utils/api';
import { isAdmin } from '@/utils/user';

function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type:mime })
}

export default {
    name: 'AdminEditView',
    data() {
        return {
            title: "",
            thumbnail: null,
            content: "",
            isAdmin: isAdmin()
        }
    },
    async mounted() {
        try {
            if (!this.isAdmin) this.$router.replace('/', { query: { adminKey: 'clear' } })

            const response = await getApi().get(`/articles/${this.$route.params.id}`)
            const data = response.data

            if (!data) throw new Error('Response data is missing')

            this.title = data.title
            this.thumbnail = dataURLtoFile(data.thumbnail, 'default thumbnail')
            this.content = data.content
            
            const dataTransfer = new DataTransfer()
            dataTransfer.items.add(this.thumbnail)
            this.$refs.thumbnail.files = dataTransfer.files
        } catch (error) {
            this.$logger.error(error)
        }
    },
    methods: {
        onThumbnailChanged() {
            this.thumbnail = this.$refs.thumbnail.files[0]

            this.$logger.debug({
                title: this.title,
                thumbnail: this.thumbnail,
                content: this.content
            })
        },
        async saveArticle() {
            try {
                const response = await getApi().put(`/articles/${this.$route.params.id}`, {
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

                this.$logger.warn(`Someone has edited an article with id [${article._id}]`)
                this.$router.replace('/')
            } catch (error) {
                this.$logger.error(error)
            }
        }
    }
}
</script>