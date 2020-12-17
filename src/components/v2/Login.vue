// components/Login.vue

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="onSubmit(email, password)">
      <input type="text" v-model="email" placeholder="Email Address" />
      <input type="password" v-model="password" placeholder="Password" />
      <input type="submit" value="Login" />
    </form>
    <p><i>{{msg}}</i></p>
    <a href="http://localhost:8080/oauth2/authorization/github">github</a>
    <a href="http://localhost:8080/oauth2/authorization/google">google</a>
    <a href="http://localhost:8080/oauth2/authorization/kakao">kakaotalk</a>
    <a href="http://localhost:8080/oauth2/authorization/naver">naver</a>
    <Buttons />
  </div>
</template>

<script>
import Buttons from './Buttons.vue'

export default {
  components: {
    Buttons
  },
  data() {
    return {
      email: "",
      password: "",
      msg: "",
    }
  },
  created() {
    const {search} = window.location
    console.log(window.location)
    if (search==='')
      return

    const tokens = search.replace(/^\?/, '').split('&')
    const {newAuthToken} = tokens.reduce((qs, tkn) => {
      const pair = tkn.split('=')
      qs[pair[0]] = decodeURIComponent(pair[1])
      return qs
    }, {})
    console.log("newAuthToken : ", newAuthToken)
    if(typeof newAuthToken === 'undefined'){
      console.log("newAuthToken undefined!")
      return
    }
    if(newAuthToken!==''){
      this.$store.dispatch("auth2/TOKENLOGIN", newAuthToken)
      .then(() => this.$router.push('/'))
    }
  },
  methods: {
    onSubmit(email, password) {
      // LOGIN 액션 실행
      this.$store
          .dispatch("auth2/LOGIN", { email, password })
          .then(() => this.redirect())
          // .then(() => this.$router.push('/'))
          .catch(({ message }) => (this.msg = message))
    },

    redirect() {
      const {search} = window.location
      if (search==='') {
        this.$router.push('/')
      } else {
        const tokens = search.replace(/^\?/, '').split('&')
        const {returnPath} = tokens.reduce((qs, tkn) => {
          const pair = tkn.split('=')
          qs[pair[0]] = decodeURIComponent(pair[1])
          return qs
        }, {})
        this.$router.push(returnPath)
      }
    }
  },
}
</script>
