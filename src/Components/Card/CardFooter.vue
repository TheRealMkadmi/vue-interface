<script>
import CardHeader from './CardHeader.vue';

export default {

    name: 'CardFooter',

    extends: CardHeader,

    props: {

        /**
         * The component's HTML tag name
         *
         * @property String
         */
        tag: {
            type: String,
            default: 'div'
        }

    }

};
</script>
