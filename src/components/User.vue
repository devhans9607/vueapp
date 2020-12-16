<template>
  <div>
    <div v-for="(post, idx) in posts" :key="idx">
      <h2>{{post.postId}}</h2>
      <h2>{{post.title}}</h2>
<!--      <img :src="`${user.avatar}`" alt />-->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: null
    };
  },
  methods: {
    fetchData() {
      axios
          .get("http://localhost:8080/api/v1/posts")
          .then(res => {
            console.log(res.data.content.simplePostPage.content);
            this.posts = res.data.content.simplePostPage.content;
            //this.totalPage = res.data.total_pages;
          })
          .catch(err => {
            console.log(err);
          });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
