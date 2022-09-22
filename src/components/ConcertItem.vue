<script setup>
defineProps({
    concertData: {
        type: Object,
        required: true
    }
})
</script>


<template>
    <article class="border-black border-t-2 p-4">
        <h2>{{concertData?.title}}</h2>
        <p>{{concertData?.shortDescription}}</p>
        <p>{{new Date(concertData?.datetime)}}</p>
    </article>
</template>