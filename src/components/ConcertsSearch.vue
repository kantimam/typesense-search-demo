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
let searchFilters = ""
//let searchFilters = "isGuestEvent:false"


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
            //end: currentMonthLastDay.getTime()
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
            <ais-configure :filters="searchFilters" />
            <div>
                <h2 class="text-5xl font-bold mb-5">Konzertkalender</h2>
                <div>
                    <ais-numeric-menu attribute="datetime" :items="createMonthFilters()" />
                </div>
                <div class="flex gap-5 mt-10">
                    <div>
                        <ais-search-box placeholder="Konzerte, Künstler, Komponisten ..." />
                    </div>
                    <div>
                        <ais-refinement-list attribute="venue" :sort-by="['count:desc']" />
                        <ais-refinement-list attribute="eventType" :sort-by="['count:desc']" />
                    </div>
                </div>
            </div>

            <ais-stats />
            <div class="mt-24 mb-5 flex items-center justify-between">
                <h2 class="text-5xl font-bold">
                    Monat 2022
                </h2>

                <ais-toggle-refinement attribute="isGuestEvent" label="Gastveranstaltungen" on="false">
                    <template v-slot="{ value, refine, createURL, sendEvent }">
                        <a :href="createURL(value)" :style="{ fontWeight: value.isRefined ? 'bold' : '' }"
                            @click.prevent="refine(value)">
                            Gastveranstaltung {{value.isRefined? "anzeigen" : "verstecken" }}
                            ({{ value.count }})
                        </a>
                    </template>
                </ais-toggle-refinement>
            </div>


            <InfiniteHits>
                <template #item="{ item }">
                    <ConcertItem :concertData="item" />
                </template>
            </InfiniteHits>
        </ais-instant-search>
    </div>
</template>
    

    
<style lang="scss">
.concerts-search {
    padding: 0 20px;
    margin: 0 auto;
    max-width: 1440px;
}

.ais-SearchBox-form {
    padding: 8px 14px 8px 24px;
    outline-offset: 0;
    border-radius: 50px;
    border: 1px solid black;
    font-size: 18px;
    line-height: 24px;
    display: flex;
    align-items: center;
    width: 336px;

    input {
        flex: 1;
        border: none;
        outline: none;

        &:focus-visible {
            border: none;
            outline: none;

        }
    }

    .ais-SearchBox-submit {
        svg {
            width: 20px;
            height: 20px;
        }
    }

    .ais-SearchBox-reset {
        display: none;
    }
}

.ais-NumericMenu-list {
    display: flex;
    gap: 5px;
    width: 100%;
    overflow-x: auto;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;

    /* Firefox */
    &::-webkit-scrollbar {
        display: none;
    }

    li {
        span {
            display: block;
            width: 120px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: black;
            color: white;
        }

        &.ais-NumericMenu-item--selected {

            span {
                background: #fc0;
                color: black;
            }
        }
    }

    input {
        width: 0;
        height: 0;
        opacity: 0;
        z-index: -1;
        position: absolute;
        left: -999px;
        top: -999px;
    }
}

.ais-RefinementList {
    ul {
        display: flex;
        flex-wrap: wrap;
        gap: 10px 20px;

        li {
            label {
                font-size: 18px;
                line-height: 24px;
                padding: 8px 20px;
                border-radius: 40px;
                border: 1px solid black;
                display: block;

                input {
                    width: 0;
                    height: 0;
                    opacity: 0;
                    z-index: -1;
                    position: absolute;
                    left: -999px;
                    top: -999px;
                }

                .ais-RefinementList-count {
                    margin-left: 6px;
                }
            }

            &.ais-RefinementList-item--selected {
                label {
                    background: black;
                    color: white;
                }
            }
        }
    }


}

.ais-RefinementList+.ais-RefinementList {
    margin-top: 10px;
}
</style>