<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-brand">vue-login</div>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/" class="nav-link">
             Home
          </a>
        </li>
      </div>
      <div class="navbar-nav ml-auto"  v-if="!isAuthenticated">
        <li class="nav-item">
          <a href="/register" class="nav-link">
             Sign Up
          </a>
        </li>
        <li class="nav-item">
          <a href="/login" class="nav-link">
             Login
          </a>
        </li>
      </div>

      <div class="navbar-nav ml-auto">
        <li class="nav-item">
          <a href="/me" class="nav-link" >
            me
<!--            :  {{currentUser.simpleMemberDto.userId}}-->
          </a>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <a href class="nav-link" @click="logOut" >
             LogOut
          </a>
        </li>
      </div>
    </nav>



    <div class="container">
      <router-view />
    </div>
  </div>
</template>



<style scoped>
#app {

}
</style>

<script>
export default {
  computed: {
    isAuthenticated(){
      if (localStorage.getItem('accessToken')){
        return true
      }
      else return false
    },

    currentUser () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('auth2/LOGOUT')
      this.$router.push('/')
    }
  }
}
</script>
