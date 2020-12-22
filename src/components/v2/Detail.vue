<template>
  <div>
    <h1>details</h1>

    <div class="AddWrap">
      <form>
        <table class="tbAdd">
          <colgroup>
            <col width="15%" />
            <col width="*" />
          </colgroup>
          <tr>
            <th>title</th>
            <td>{{subject}}</td>
          </tr>
          <tr>
            <th>contents</th>
            <td class="txt_cont" v-html="cont"></td>
          </tr>
        </table>
      </form>
    </div>

    <div class="btnWrap">
      <a href="javascript:;" @click="fnList" class="btn">back to list</a>
      <a href="javascript:;" @click="fnMod" class="btnAdd btn">edit post</a>
      <a href="javascript:;" @click="fnDel" class="btnDel btn">delete post</a>
    </div>

<!--    comments sec-->
    <div>
      <form>
        <table class="tbAdd">
          <colgroup>
            <col width="15%" />
            <col width="*" />
            <col width="10%"/>
          </colgroup>
          <tr>
            <th>comment</th>
            <td><input type="text" v-model="cCont" ref="subject" /></td>
            <td><a href="javascript:;" @click="cmAdd">commit</a></td>
          </tr>
        </table>
      </form>
    </div>

    <div class="listWrap">
      <table class="tbList">
        <colgroup>
          <col width="*" />
          <col width="10%" />
          <col width="30%" />
          <col width="5%" />
        </colgroup>
        <tr v-for="(row, idx) in list" :key="idx">
          <td class="txt_left">{{row.contents}}</td>
          <td>{{row.cname}}</td>
          <td>{{row.createdAt}}</td>
          <td><a href="javascript:;" @click="cmDel(row.commentId, row.cuid)">x</a></td>
          <!--          <td>{{row.regdate.substring(0,10)}}</td>-->
        </tr>
        <tr v-if="list.length == 0">
          <td colspan="4">no comments yet..</td>
        </tr>
      </table>
    </div>


  </div>

</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      body:this.$route.query
      ,post_id:''
      ,subject:''
      ,cont:''
      ,view:''
      ,num:this.$route.query.num
      ,uid:''
      ,form:''
      ,list:''
      ,cCont:''
    }
  }
  ,mounted() {
    console.log("this.body : ", this.body)
    this.fnGetView();
  }
  ,methods:{
    fnGetView() {
      this.body.commentsPerPage = 10000
      axios.get('http://localhost:8080/api/v1/post/'+this.body.num,{params:this.body})
          .then((res)=>{
            console.log("detail 0 ",res)
            this.view = res.data.content;
            console.log("fnGetView",this.view)
            this.post_id = this.view.simplePost.postId
            this.subject = this.view.simplePost.title
            this.cont = this.view.simplePost.contents.replace(/(\n)/g,'<br/>');
            this.uid = this.view.simplePost.puid;
            this.list = this.view.simpleCommentPage.content
          })
          .catch((err)=>{
            console.log(err);
          })
    }
    ,fnList(){
      delete this.body.commentsPerPage;
      delete this.body.num;
      this.$router.push({path:'/',query:this.body});
    }
    ,fnMod(){
      this.$router.push({path:'/write',query:this.body});
    }
    ,fnDel(){
      let payload = {
        postId:this.post_id
        ,uid:this.uid
      }
      axios.delete('http://localhost:8080/api/v1/post',{data: payload})
        .then((res)=>{
          if(res.data.code === 1000){
            alert('삭제되었습니다.');
            this.fnList()
          }
          else{
            alert("삭제 에러.. ㅠ")
          }
        })
          .catch((err)=>{
            console.log(err);
          })
    }
    ,cmDel(cid, cuid){
      let payload = {
        commentId:cid
        ,uid:cuid
      }
      axios.delete('http://localhost:8080/api/v1/comment',{data: payload})
          .then((res)=>{
            console.log("commentDel res:",res)
            if(res.data.code === 1000){
              alert('삭제되었습니다.');
              this.$router.go();
            }
            else{
              alert("삭제 에러.. ㅠ")
            }
          })
          .catch((err)=>{
            console.log(err);
          })
    }
    ,cmAdd(){
      if(!this.cCont){
        alert("댓글을 먼저 쓰세요..");
        this.$refs.cCont.focus();
        return;
      }
      this.form = {
        contents:this.cCont
        ,postId:this.post_id
      }
      console.log("this.form: ",this.form)
      axios.post('http://localhost:8080/api/v1/comment',this.form)
          .then((res)=>{
            console.log(res)
            if(res.data.code === 1000) {
              alert('등록되었습니다.');
              //this.fnList();
              this.$router.go();
            } else {
              alert("실행중 실패했습니다.\n다시 이용해 주세요");
            }
          })
          .catch((err)=>{
            console.log(err);
          })
    }
  }
}
</script>
