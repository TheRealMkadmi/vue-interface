<template>
    <div class="list-group" :class="classes">
        <slot />
    </div>
</template>

<script>
import { each } from '../../Helpers/Functions';
import prefix from '../../Helpers/Prefix/Prefix.js';
import Shadowable from '../../Mixins/Shadowable';

export default {

    mixins: [
        Shadowable
    ],

    props: {

        /**
         * The list group appear flush (without some borders).
         *
         * @property Boolean
         */
        flush: {
            type: Boolean,
            default: false
        }

    },

    computed: {
        classes() {
            return Object.assign(prefix({
                'flush': this.flush,
            }, 'list-group'), {
                [this.shadowClassName]: true
            });
        }
    },

    mounted() {
        this.bindEventsToChildren();
    },

    updated() {
        this.bindEventsToChildren();
    },

    methods: {

        bindEventsToChildren() {
            each(this.$children, child => {
                child.$off('click', event => this.onClickItem(event, child));
                child.$on('click', event => this.onClickItem(event, child));
            });
        },

        /**
         * The callback function for the `click` event.
         *
         * @return void
         */
        onClick(event) {
            this.$emit('click', event);
        },

        /**
         * The callback function for the child `click` events.
         *
         * @return void
         */
        onClickItem(event, child) {
            this.$emit('item:click', event, child);
        }

    }

};
</script>
