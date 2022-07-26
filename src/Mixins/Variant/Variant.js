import prefix from '../../Helpers/Prefix/Prefix.js';
import kebabCase from '../../Helpers/Functions/kebabCase.js';

export default {

    props: {

        /**
         * The variant attribute
         *
         * @property String
         */
        variant: {
            type: String,
            default: 'primary'
        }

    },

    computed: {

        variantClassPrefix() {
            return kebabCase(this.$options.name);
        },

        variantClass() {
            return prefix(this.variant, this.variantClassPrefix);
        }

    }

};
