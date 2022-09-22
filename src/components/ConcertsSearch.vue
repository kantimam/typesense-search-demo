<script setup>
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { history } from 'instantsearch.js/es/lib/routers';
import ConcertItem from "./ConcertItem.vue";
import InfiniteHits from "./InfiniteHits.vue";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: {
        apiKey: "xyz", // Be sure to use an API key that only allows search operations
        nodes: [
            {
                host: "localhost",
                path: '', // Optional. Example: If you have your typesense mounted in localhost:8108/typesense, path should be equal to '/typesense'
                port: "8108",
                protocol: "http",
            },
        ],
        cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
    },
    // The following parameters are directly passed to Typesense's search API endpoint.
    //  So you can pass any parameters supported by the search endpoint below.
    //  query_by is required.
    additionalSearchParameters: {
        query_by: "title,shortDescription,eventType,venue,mainArtist,secondaryArtist",
    },


});
let searchClient = typesenseInstantsearchAdapter.searchClient;
let routing = { router: history() }


function createMonthFilters(months = 12) {
    const currentDate = new Date(Date.now());
    currentDate.setFullYear(2021);
    let currentMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    let currentMonthLastDay = new Date(currentMonthFirstDay.getFullYear(), currentMonthFirstDay.getMonth() + 1, 0)
    const dateFilters = [];
    for (let i = 0; i < months; i++) {
        dateFilters.push({
            label: `${currentMonthFirstDay.toLocaleDateString('de-DE', { year: 'numeric', month: 'short' })}`,
            start: currentMonthFirstDay.getTime(),
            end: currentMonthLastDay.getTime()
        });
        currentMonthFirstDay.setMonth(currentMonthFirstDay.getMonth() + 1, 1)
        currentMonthLastDay.setFullYear(currentMonthFirstDay.getFullYear())
        currentMonthLastDay.setMonth(currentMonthFirstDay.getMonth() + 1, 0)

    }
    return dateFilters;
}

</script>
    
<template>
    <div class="concerts-search">
        <ais-instant-search :search-client="searchClient" index-name="concerts" :routing="routing">
            <div>
                <h2>Konzertkalender</h2>
                <div>
                    <ais-numeric-menu attribute="datetime" :items="createMonthFilters()" />
                </div>
                <div class="flex gap-2">
                    <div>
                        <ais-search-box />
                    </div>
                    <div>
                        <ais-refinement-list attribute="eventType" />
                    </div>
                </div>
            </div>

            <InfiniteHits>
                <template #item="{ item }">
                    <ConcertItem :concertData="item" />
                </template>
            </InfiniteHits>
        </ais-instant-search>
    </div>
</template>
    

    