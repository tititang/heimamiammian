import Vue from 'vue'
import moment from 'moment'
Vue.filter('mydate',function(x) {
    return moment(x).format("YYYY-MM-DD");
})
