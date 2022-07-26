import prefix from '../../Helpers/Prefix/Prefix.js';
import kebabCase from '../../Helpers/Functions/kebabCase.js';

export default {

    props: {

        /**
         * The size of the form control
         *
         * @property String
         */
        size: {
            type: String,
            default: 'md',
            validate: value => ['sm', 'md', 'lg'].indexOf(value) !== -1
        }

    },

    computed: {

        sizeableClassPrefix() {
            return kebabCase(this.$options.name);
        },

        sizeableClass() {
            return prefix(this.size, this.sizeableClassPrefix);
        }

    }

};
