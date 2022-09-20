<script setup>
defineProps({
    concertData: {
        type: Object,
        required: true
    }
})
</script>


<template>
    <article>
        <h2>{{concertData?.title}}</h2>
        <p>{{concertData?.shortDescription}}</p>
        <p>{{new Date(concertData?.datetime)}}</p>
    </article>
</template>