<script setup>
defineProps({
    concertData: {
        type: Object,
        required: true
    }
})
</script>


<template>
    <article class="flex">
        <div class="mr-5">
            <div class="concert-image">

            </div>
        </div>
        <div class="mr-16">
            <p class="text-2xl">{{concertData?.isGuestEvent? "Gastveranstaltung" : concertData?.eventType}}</p>
            <h2 class="mt-8 text-4xl font-bold">
                <ais-highlight attribute="title" :hit="concertData" />
            </h2>
            <h2 v-if="concertData.mainArtist && concertData.mainArtist!==''" class="text-4xl font-bold">
                <ais-highlight attribute="mainArtist" :hit="concertData" /> <span class="mt-8 text-4xl font-normal">Main
                    Artist</span>
            </h2>
            <h2 v-if="concertData.secondaryArtist && concertData.secondaryArtist!==''" class="text-4xl font-bold">
                <ais-highlight attribute="secondaryArtist" :hit="concertData" /> <span
                    class="mt-8 text-4xl font-normal">Secondary Artist</span>
            </h2>

            <p class="mt-8 text-xl">
                <ais-highlight attribute="shortDescription" :hit="concertData" />
            </p>
            <button class="mt-8 text-base py-2 px-5 border-black border-2"><a
                    href="https://www.bph.onl/konzerte/kalender/details/54734/">zur Detailseite</a></button>
        </div>
        <div class="info ml-auto w-72">
            <p class="text-2xl">{{new Date(concertData?.datetime).toLocaleDateString('de-DE', {weekday: 'long'})}}</p>
            <p class="text-2xl font-bold">{{new Date(concertData?.datetime).toLocaleDateString('de-DE')}}</p>
            <p class="text-2xl">{{new Date(concertData?.datetime).toLocaleTimeString('de-DE', {hour: "numeric", minute:
            "2-digit"})}} Uhr</p>
            <p class="mt-5 text-2xl">{{concertData?.venue}}</p>
            <button class="mt-8 text-base py-2 px-5 bg-primary">Tickets kaufen</button>
            <button class="mt-4 text-base py-2 px-5 bg-black text-white">Live in der Digital Concert Hall</button>
            <button class="mt-4 text-base py-2 px-5 bg-black text-white">Radioübertragung</button>
        </div>

        <!--  <pre>{{JSON.stringify(concertData, null, 2)}}</pre> -->
    </article>
</template>



<style scoped lang="scss">
article {
    border-top: 1px solid black;
    padding: 40px 0;
}

.concert-image {
    width: 453px;
    height: 344px;
    background: #D9D9D9;
}

.info {
    button {
        display: block;
        min-width: 280px;
    }
}
</style>