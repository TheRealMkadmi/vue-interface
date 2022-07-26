<template>
    <div class="dropdown-menu" :class="{'dropdown-menu-right': align === 'right', 'show': show}" :aria-labelledby="id" tabindex="-1" @click="onClick">
        <component :is="prefix(item.type || 'item', 'dropdown-menu')" v-for="(item, i) in items" :key="i" v-bind="item" />
        <slot />
    </div>
</template>

<script>
import uuid from '../../Helpers/Uuid';
import prefix from '../../Helpers/Prefix';
import { each } from '../../Helpers/Functions';
import DropdownMenuItem from './DropdownMenuItem.vue';
import DropdownMenuHeader from './DropdownMenuHeader.vue';
import DropdownMenuDivider from './DropdownMenuDivider.vue';

export default {

    name: 'DropdownMenu',

    components: {
        DropdownMenuItem,
        DropdownMenuHeader,
        DropdownMenuDivider
    },

    props: {

        /**
         * The `id` attribute on the toggle button and aria label. If no `id` is
         * defined, then a UUID will be generated instead.
         *
         * @property Object
         */
        id: {
            type: String,
            default: uuid
        },

        /**
         * Display the dropdown menu aligned left or right
         *
         * @property String
         */
        align: {
            type: String,
            default: 'left',
            validate(value) {
                return ['left', 'right'].indexOf(value.toLowerCase()) !== -1;
            }
        },

        /**
         * The default visibility of the dropdown menu.
         *
         * @property Object
         */
        show: Boolean,

        /**
         * An array of dropdown items. If an key/value pair isn't defined, the
         * default value will be used. If no items are defined, then the slot
         * named "items" can be used to define the options with HTML.
         *
         * [{
         *      type: 'item', // String [item|header|divider]
         *      href: '#', // String
         *      label: 'Some label', // String
         *      onClick: (event) => {} // Function
         * }]
         *
         * @property Array
         */
        items: Array

    },

    mounted() {
        each(this.$children, child => {
            child.$on('click', event => {
                this.onItemClick(event, child);
            });
        });
    },

    methods: {

        prefix: prefix,

        /**
         * A callback function for the `click` event.
         *
         * @param Object event
         * @param Object item
         * @return void
         */
        onClick(event) {
            this.$emit('click', event);
        },

        /**
         * A callback function for the `click` event.
         *
         * @param Object event
         * @param Object item
         * @return void
         */
        onItemClick(event, item) {
            this.$emit('item:click', event, item);
        }

    }

};
</script>
