import { Vue } from './Vue'

new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    html: '<h1>Hello Vue!</h1> <input v-model="message" />',
  },
})


