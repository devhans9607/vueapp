<template>
  <div>
    <h2>Me</h2>
<!--    <div>-->
<!--      <label>User Info:</label>-->
<!--      <pre>{%raw%}{{user}}{%endraw%}</pre>-->
<!--    </div>-->
<!--    <div>-->
<!--      <label>Access Log:</label>-->
<!--      <div v-for="log in accessLog">-->
<!--        {%raw%}{{log.userId}}, {{log.createdAt}}{%endraw%}-->
<!--      </div>-->
<!--    </div>-->
    <img :src=picUrl>
    <ul id="v-for-object" class="demo">
      <li v-for="(value, name) in user">
        {{name}}:{{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      user: null,
      picUrl : null,
      accessLog: [],
    }
  },
  created() {
    axios
        .get("http://localhost:8080/api/v1/user")
        .then(
            ({ data }) => (
                console.log(data),
                this.user = data.content,
                this.picUrl = data.content.picture
                // (this.user = data.user), (this.accessLog = data.accessLog)
            )
        )
  },
}
</script>
