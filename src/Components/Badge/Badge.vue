<template>
    <a v-if="href" :href="href" class="badge" :class="mergeClasses(classes, variantClass)">
        <slot>{{ label }}</slot>
        <span class="sr-only" v-html="accessibility" />
    </a>
    <span v-else class="badge" :class="mergeClasses(classes, variantClass)">
        <slot>{{ label }}</slot>
        <span class="sr-only" v-html="accessibility" />
    </span>
</template>

<script>
import prefix from '../../Helpers/Prefix';
import Variant from '../../Mixins/Variant';
import MergeClasses from '../../Mixins/MergeClasses';
import kebabCase from '../../Helpers/Functions/kebabCase.js';

export default {

    name: 'Badge',

    mixins: [
        Variant,
        MergeClasses
    ],

    props: {

        /**
         * The screen reader accessibility label.
         *
         * @property String
         */
        accessibility: String,

        /**
         * If an href attribute is passed, the badge becomes an anchor.
         *
         * @property String
         */
        href: String,

        /**
         * The badge appear as pill shaped.
         *
         * @property String
         */
        pill: Boolean,

        /**
         * The badge label.
         *
         * @property String
         */
        label: [Number, String],

        /**
         * The badge appear as secondary in size to the parent element.
         *
         * @property String
         */
        secondary: Boolean

    },

    computed: {

        classes() {
            return prefix({
                'pill': this.pill,
                'secondary': this.secondary
            }, kebabCase(this.$options.name));
        }
    }
};
</script>
