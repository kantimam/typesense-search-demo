<template>
    <ol v-if="state">
        <li v-for="hit in state.hits" :key="hit.objectID">
            <slot name="item" :item="hit"> </slot>
        </li>
        <li class="list-none h-12 bg-slate-400" v-observe-visibility="visibilityChanged"></li>
    </ol>
</template>
  
<script>
import { createWidgetMixin } from 'vue-instantsearch/vue3/es';
import { connectNumericMenu } from 'instantsearch.js/es/connectors';
export default {
    mixins: [createWidgetMixin({ connector: connectNumericMenu })],
    methods: {
        visibilityChanged(isVisible) {
            console.log("check vis", isVisible)
            if (isVisible && !this.state.isLastPage) {
                this.state.showMore();
            }
        },
    },
};
</script>