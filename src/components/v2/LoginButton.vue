<template>
  <button class='button' v-on:click='buttonClick' >
<!--    <img class='image' :src='require("../assets/" + service + ".png")' />-->
    {{'Login with ' + service }}
  </button>
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios'

export default {
  props: [ 'service', 'index' ],
  methods: {
    buttonClick: function() {
      axios.get('http://localhost:8080/oauth2/authorization/' + this.service, {headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json; charset = utf-8'
        }})
          .then(function(res) {
            window.location.href = res.data;
          })
          .catch(function(err) {
            console.log(err)
          })
    }
  },
}
</script>

<style scoped>
.button {
  width: 400px; height: 50px; font-weight: bold;
  font-size: 30px; background: #6D7E85;
  color: white; border-radius: 10px; margin-top: 10px;
  display: flex; align-items: center; justify-content: center;
}
.button:hover {
  cursor: pointer;
}
.image {
  width: 40px; height: auto;
}
</style>
