import DateFilter from './DateFilter.js';
import MomentFilter from './MomentFilter.js';

export {
    DateFilter,
    MomentFilter
};

export default function(Vue, options) {
    Vue.filter('date', DateFilter);
    Vue.filter('moment', MomentFilter);
};
