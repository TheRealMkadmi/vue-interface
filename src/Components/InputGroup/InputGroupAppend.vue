<template>
    <div class="input-group-append">
        <input-group-text v-if="text">
            <slot />
        </input-group-text>
        <slot v-else />
    </div>
</template>

<script>
import InputGroupText from './InputGroupText.vue';

export default {

    name: 'InputGroupAppend',

    components: {
        InputGroupText
    },

    props: {

        /**
         * The type attribute
         *
         * @property String
         */
        text: Boolean

    }

};
</script>
