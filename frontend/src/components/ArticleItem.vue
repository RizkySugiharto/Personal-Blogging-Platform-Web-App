<template>
    <div class="card article bg-primary my-3">
        <router-link :to="`/article/${articleId}`" class="text-decoration-none">
            <div class="card-header border-0 p-0">
                <img :src="thumbnail" class="card-img-top">
            </div>
            <div class="card-body">
                <h4 class="m-0 text-tertiary">{{ title }}</h4>
                <p class="m-0 text-tertiary fw-semibold">{{ createdAt }}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        articleId: String,
        thumbnail: String,
        title: String,
        createdAt: String
    }
}
</script>

<style>

</style>