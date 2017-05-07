import Vue from 'vue'
import App from './App.vue'

/* My own Vue-directives!
 * Here, we register global custom directive v-focus
 * This directive do "input line element" are focused and active, with blinked "cursor"
*/
Vue.directive('focus', {
  // When needed element inserted in DOM...
  inserted: function (el) {
    // Switch "focus" to element
    el.focus();
  }
});

window.vm1 = new Vue({
  el: '#app',
  render: h => h(App)
})
