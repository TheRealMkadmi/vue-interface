<template>
    <div class="alert" :class="mergeClasses(variantClass, {show: isVisible, fade: fade})" role="alert">
        <alert-close v-if="dismissible" @click="dismiss()" />
        <alert-heading v-if="title || heading">
            {{ title || heading }}
        </alert-heading>
        <slot />
        <progress-bar
            v-if="typeof show === 'number'"
            :variant="variant"
            :height="5"
            :value="dismissCount"
            :max="show"
            class="my-3" />
    </div>
</template>

<script>
import AlertClose from './AlertClose.vue';
import AlertHeading from './AlertHeading.vue';
import ProgressBar from '../ProgressBar';
import Variant from '../../Mixins/Variant';
import transition from '../../Helpers/Transition';
import MergeClasses from '../../Mixins/MergeClasses';

export default {

    name: 'Alert',

    components: {
        AlertClose,
        AlertHeading,
        ProgressBar
    },

    mixins: [
        Variant,
        MergeClasses
    ],

    props: {

        /**
         * Is the alert dismissible
         *
         * @property Boolean
         */
        dismissible: Boolean,

        /**
         * The alert's title/heading
         *
         * @property Boolean
         */
        heading: String,

        /**
         * The alert's title/heading
         *
         * @property Boolean
         */
        title: String,

        /**
         * Should the alert fade when hidden
         *
         * @property Boolean
         */
        fade: {
            type: Boolean,
            default: true
        },

        /**
         * Should the alert be visible by default. If passed a number, alert
         * will be shown for the number of seconds that are passed.
         *
         * @property Boolean
         */
        show: {
            type: [Number, Boolean],
            default: true
        }

    },

    data() {
        return {
            dismissCount: this.show,
            isVisible: this.show
        };
    },

    mounted() {
        if(typeof this.show === 'number') {
            const el = this.$el.querySelector('.progress-bar');

            this.$emit('dismiss-countdown', this.dismissCount = this.show);

            const interval = setInterval(() => {
                this.$emit('dismiss-countdown', this.dismissCount -= 1);

                if(!this.dismissCount) {
                    clearInterval(interval);
                    transition(el).then(delay => this.dismiss());
                }
            }, 1000);
        }
    },

    methods: {

        dismiss() {
            this.isVisible = false;

            transition(this.$el).then(delay => {
                this.$emit('dismiss');
            });
        }

    }

};
</script>
