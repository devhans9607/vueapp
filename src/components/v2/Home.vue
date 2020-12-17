<template>
  <div>
    <h2>Home</h2>
    <div v-for="(post, idx) in posts" :key="idx">
      <h2>
      <a href="#">{{post.postId}} / {{post.title}} / {{post.pname}} / {{post.createdAt}}</a></h2>
      <!--      <img :src="`${user.avatar}`" alt />-->
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      posts: null
    };
  },
  methods: {
    fetchData() {
      axios
          .get("http://localhost:8080/api/v1/posts?postPerPage=30")
          .then(res => {
            console.log(res.data.content.simplePostPage.content);
            this.posts = res.data.content.simplePostPage.content;
            //this.totalPage = res.data.total_pages;
          })
          .catch(err => {
            console.log(err);
          });
    },
    hasToken() {
      const link = this.$router.resolve({
        name: newAuthToken,
      });
      if (link && link.href !== '/') {
        return true;
      }
      return false;
    }
  },
  created() {
    this.fetchData();
  }
}
</script>
