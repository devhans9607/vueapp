<template>
  <div>
    <h1>{{num ? 'Edit Post':'New Post'}}</h1>

    <div class="AddWrap">
      <form>
        <table class="tbAdd">
          <colgroup>
            <col width="15%" />
            <col width="*" />
          </colgroup>
          <tr>
            <th>title</th>
            <td><input type="text" v-model="subject" ref="subject" /></td>
          </tr>
          <tr>
            <th>contents</th>
            <td><textarea v-model="cont" ref="cont"></textarea></td>
          </tr>
        </table>
      </form>
    </div>

    <div class="btnWrap">
      <a href="javascript:;" @click="fnList" class="btn">목록</a>
      <a v-if="!num" href="javascript:;" @click="fnAddProc" class="btnAdd btn">등록</a>
      <a v-else href="javascript:;" @click="fnModProc" class="btnAdd btn">수정</a>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() { //변수 생성
    return{
      subject:''
      ,cont:''
      ,form:'' //form 전송 데이터
      ,num:this.$route.query.num
      ,body:this.$route.query
      ,post_id:''
      ,uid:''
    }
  }
  ,mounted(){
    if(this.num){
      this.fnGetView();
    }
  }
  ,methods:{
    fnList(){ //리스트 화면으로 이동 함수
      this.$router.push({path:'/',query:this.body});

    }
    ,fnGetView(){
      axios.get('http://localhost:8080/api/v1/post/'+this.body.num,{params:this.body})
      .then((res)=>{

        this.view = res.data.content;
        this.subject = this.view.simplePost.title;
        this.cont = this.view.simplePost.contents.replace(/(\n)/g,'<br/>');
        this.uid = this.view.simplePost.puid;
      })
    }
    ,fnView() {
      this.$router.push({path:'/detail',"query":this.body});
    }
    ,fnAddProc() { //등록 프로세스
      if(!this.subject) { //제목이 없다면 값을 입력하라고 알려준다.
        alert("제목을 입력해 주세요");
        this.$refs.subject.focus(); //방식으로 선택자를 찾는다.
        return;
      }

      this.form = { //backend로 전송될 POST 데이터
        title:this.subject
        ,contents:this.cont
      }

      axios.post('http://localhost:8080/api/v1/post',this.form)
          .then((res)=>{
            console.log(res)
            if(res.data.code === 1000) {
              alert('등록되었습니다.');
              this.fnList();
            } else {
              alert("실행중 실패했습니다.\n다시 이용해 주세요");
            }
          })
          .catch((err)=>{
            console.log(err);
          })

    }
    ,fnModProc(){
      if(!this.subject) {
        alert("제목을 입력해 주세요");
        this.$refs.subject.focus(); //방식으로 선택자를 찾는다.
        return;
      }

      this.form = {
        postId:this.num
        ,title:this.subject
        ,contents:this.cont
        ,uid:this.uid
      }
      console.log("put_test : ", this.form)
      axios.put('http://localhost:8080/api/v1/post',this.form)
          .then((res)=>{
            if(res.data.code === 1000) {
              alert('수정되었습니다.');
              this.fnView();
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
