<template>
    <navigation-item class="dropdown">
        <slot name="toggle-button">
            <navigation-link
                href="#"
                class="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                :aria-expanded="isDropdownShowing"
                @click.native.prevent="toggle()"
                @blur="onBlur">
                {{ label }}
            </navigation-link>
        </slot>

        <slot name="dropdown-menu">
            <dropdown-menu
                :id="$attrs.id"
                :align="align"
                :show.sync="isDropdownShowing"
                @item:click="onItemClick">
                <slot />
            </dropdown-menu>
        </slot>
    </navigation-item>
</template>

<script>
import NavigationItem from './NavigationItem.vue';
import NavigationLink from './NavigationLink.vue';
import DropdownMenu from '../DropdownMenu';
import BtnDropdown from '../BtnDropdown';

export default {

    name: 'NavigationDropdown',

    components: {
        DropdownMenu,
        NavigationItem,
        NavigationLink
    },

    extends: BtnDropdown

};
</script>
