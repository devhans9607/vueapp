<template>
  <div>
    <h2></h2>

    <div class="searchWrap">
      <input type="text" v-model="keyword" @keyup.enter="fnSearch" /><a href="javascript:;" @click="fnSearch" class="btnSearch btn">srch</a>
    </div>

    <div class="listWrap">
      <table class="tbList">
        <colgroup>
          <col width="6%" />
          <col width="*" />
          <col width="10%" />
          <col width="15%" />
        </colgroup>
        <tr>
          <th>no</th>
          <th>title</th>
          <th>writer</th>
          <th>date</th>
        </tr>
        <tr v-for="(row, idx) in list" :key="idx">
          <td>{{row.postId}}</td>
          <td class="txt_left">
            <a href="javascript:;" @click="fnView(row.postId)">{{row.title}}</a></td>
          <td>{{row.pname}}</td>
          <td>{{row.createdAt}}</td>
<!--          <td>{{row.regdate.substring(0,10)}}</td>-->
        </tr>
        <tr v-if="list.length == 0">
          <td colspan="4">데이터가 없습니다.</td>
        </tr>
      </table>
    </div>

    <div class="pagination">
      <a href="javascript:;" @click="fnPage(1)" class="first">&lt;&lt;</a>
<!--      <a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page-1}`)"  class="prev">&lt;</a>-->
      <template v-for=" (n,index) in paginavigation()">
        <template v-if="pageNum==n">
          <strong :key="index">{{n}}</strong>
        </template>
        <template v-else>
          <a href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{n}}</a>
        </template>
      </template>
<!--      <a href="javascript:;" v-if="paging.total_page > paging.end_page" @click="fnPage(`${paging.end_page+1}`)"  class="next">&gt;</a>-->
      <a href="javascript:;" @click="fnPage(`${total_page}`)" class="last">&gt;&gt;</a>
    </div>

    <div class="btnRightWrap">
      <a href="javascript:;" @click="fnAdd" class="btn">new post</a>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() { //변수생성
    return{
      body:'' //리스트 페이지 데이터전송
      ,list:'' //리스트 데이터
      // ,no:'' //게시판 숫자처리
      // ,paging:'' //페이징 데이터
      ,start_page:'' //시작페이지
      // ,end_page:''
      ,total_page:''
      ,pageNum:this.$route.query.pageNum ? this.$route.query.pageNum:1
      ,keyword:this.$route.query.keyword
      ,paginavigation:function() { //페이징 처리 for문 커스텀
        var pageNumber = [];
        var startPage = this.start_page ;
        var endPage = startPage + 4 > this.total_page ? this.total_page : this.start_page + 4;

        for (var i = startPage; i <= endPage; i++) pageNumber.push(i);
        return pageNumber;
      }
    }
  }
  ,mounted() { //페이지 시작하면은 자동 함수 실행
    this.fnGetList();
  }
  , methods:{
    fnGetList() { //데이터 가져오기 함수
      this.body = { // 데이터 전송
        keyword:this.keyword
        ,pageNum:this.pageNum
      }
      axios.get('http://localhost:8080/api/v1/posts',{params:this.body})
          .then((res)=>{
            console.log("this.page at axios :", this.pageNum)
            console.log(res)
            if(res.data.code === 1000) {
              this.list = res.data.content.simplePostPage.content;
              // this.paging = res.data.content.simplePostPage.pageable;
              this.total_page = res.data.content.simplePostPage.totalPages;
              console.log("this.page, this.total_page - ", this.pageNum, this.total_page)
              this.start_page = this.pageNum > 2 ? this.pageNum - 2 : 1;
              // this.no = this.paging.totalCount - ((this.paging.page-1) * this.paging.ipp);
            } else {
              alert("실행중 실패했습니다.\n다시 이용해 주세요.");
            }
          })
          .catch((err)=>{
            console.log(err);
          })
    }
    ,fnAdd() {
      this.$router.push("./write");
    }
    ,getList() {
      axios.get("http://localhost:3000/api/board")
          .then((res)=>{
            console.log(res);
          })
          .then((err)=>{
            console.log(err);
          })
    }
    ,fnSearch() { //검색
      // this.paging.pageNum = 1;
      this.fnGetList();
    }
    , fnPage(n) {//페이징 이
      if(this.pageNum != n) {
        this.pageNum = n;
        console.log("it's fnPage(n)'s n, this.page - ", n, this.pageNum)
        this.fnGetList();
      }
    }
    , fnView(num){
      this.body.num = num;
      this.$router.push({path:'/detail', query:this.body});
    }
  }
}
</script>


<!--<template>-->
<!--  <div>-->
<!--    <h2>Home</h2>-->
<!--    <div v-for="(post, idx) in posts" :key="idx">-->
<!--      <h2>-->
<!--      <a href="#">{{post.postId}} / {{post.title}} / {{post.pname}} / {{post.createdAt}}</a></h2>-->
<!--      &lt;!&ndash;      <img :src="`${user.avatar}`" alt />&ndash;&gt;-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios"-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      posts: null-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    fetchData() {-->
<!--      axios-->
<!--          .get("http://localhost:8080/api/v1/posts?postPerPage=30")-->
<!--          .then(res => {-->
<!--            console.log(res.data.content.simplePostPage.content);-->
<!--            this.posts = res.data.content.simplePostPage.content;-->
<!--            //this.totalPage = res.data.total_pages;-->
<!--          })-->
<!--          .catch(err => {-->
<!--            console.log(err);-->
<!--          });-->
<!--    },-->
<!--    hasToken() {-->
<!--      const link = this.$router.resolve({-->
<!--        name: newAuthToken,-->
<!--      });-->
<!--      if (link && link.href !== '/') {-->
<!--        return true;-->
<!--      }-->
<!--      return false;-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.fetchData();-->
<!--  }-->
<!--}-->
<!--</script>-->
