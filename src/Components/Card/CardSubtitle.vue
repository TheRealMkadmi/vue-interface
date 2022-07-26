<template>
    <h6 :class="mergeClasses(className, colorableClasses)">
        <slot />
    </h6>
</template>

<script>
import Card from './Card.vue';
import MergeClasses from '../../Mixins/MergeClasses';

export default {

    name: 'CardSubtitle',

    extends: Card,

    mixins: [
        MergeClasses
    ]

};
</script>
