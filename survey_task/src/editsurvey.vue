<template>
	<div class="editbox_container">
		<div class="editbox_title">
			<!-- <p>{{title}}</p> -->
			<input type="text" v-model="title">
		</div>
		<hr/>
		<template v-for="question in questionList" track-by="$index">
			<div class="survey_question">
				<div class="survey_question_title">
					<div class="left">
						Q{{question.seq}}&nbsp;&nbsp;
						<input type="text" v-model="question.title" class="question_input">&nbsp;&nbsp;&nbsp;{{question.qtype|questiontype}}
						<!-- <em v-if="question.required">*</em> -->
					</div>
					<div class="right">
						<input type="checkbox" checked v-if="question.required" v-model="question.required">
						<input type="checkbox" v-else v-model="question.required">
						是否必填						
					</div>
					<div style="clear:both"></div>
				</div>
				<div v-if="question.qtype=='textarea'">
					<textarea class="trea" cols="70" rows="4" v-model=""></textarea>
				</div>
				<div v-else v-for="option in question.options">
					<input type="{{question.qtype}}" value="">
					<input type="text" v-model="option.content" class="edit_option">
					<button @click="deleteoption(question.seq,$index)" class="deleteopt_btn"><i class="fa fa-times"></i>删除 </button>
				</div>
				<button class="createopt_btn" @click="createoption($index)" v-if="question.qtype!='textarea'">+添加选项</button>
				<div class="edit_position">
					<button v-if="$index>0" @click="edit_position_up($index)">上移</button> 
					<button v-if="$index<(questionList.length-1)" @click="edit_position_down($index)">下移</button> 
					<button @click="edit_position_copy($index)">复用</button> 
					<button @click="edit_position_delete($index)">删除</button> 
				</div>
				<div style="clear:both"></div>
				
			</div>
		</template>
		<div class="editbox_content">
			<div v-if="show_quetype" class="que_type">
				<button @click="createques('radio')"><i class="fa fa-dot-circle-o"></i>单选</button>
				<button @click="createques('checkbox')"><i class="fa fa-check-square-o"></i>多选</button>
				<button @click="createques('textarea')"><i class="fa fa-file-text-o"></i>文本题</button>
			</div>
			<button class="createques" @click="createquestion">
				+ 添加问题
			</button>
		</div>
		<hr/>
		<div class="editbox_footer">
			<span class="">
				问卷截止日期
				<input type="text" v-model="deadline" >
			</span>
			<span class="right">
				<button @click="savesurvey">保存问卷</button>
				<button @click="release">发布问卷</button>
			</span>
			<div style="clear:both"></div>
		</div>
	</div>
</template>
<script>
import store from './store.js';
	export default{
		data(){
			var surveydata=store.fetchsurvey(this.$route.params.id);
			// alert(surveydata.status);
			return{
				show_quetype:false,
				title:surveydata.title,
				questionList:surveydata.questionList,
				deadline:surveydata.deadline,
				time:surveydata.time,
				id:parseInt(this.$route.params.id)
			}
		},
		methods:{
			createquestion:function(){
				if(this.show_quetype){
					alert("请选择要添加的题型");
				}else{
					this.show_quetype=true;
				}
			},
			createoption:function(seq){
				var temp={};
				// console.log(this.questionList[seq].options.length+1);
				temp.id=this.questionList[seq].options.length+1;
				temp.content="选项";
				this.questionList[seq].options.splice(temp.id-1,0,temp);
			},
			deleteoption:function(seq,index){
				this.questionList[seq-1].options.splice(index,1);
				if(index>0){
					for(var i=index-1;i<this.questionList[seq-1].options.length;i++){
                    	this.questionList[seq-1].options[i].id -= 1;
                	}
				}else{
					for(var i=0;i<this.questionList[seq-1].options.length;i++){
                    	this.questionList[seq-1].options[i].id -= 1;
                	}
				}
				
			},
			//题目上移
			edit_position_up:function(index){
				this.questionList.splice(index-1,0,this.questionList[index]);
				this.questionList.splice(index+1,1);
				this.questionList[index-1].seq=index;
				this.questionList[index].seq=index+1;
			},
			//题目下移
			edit_position_down:function(index){
				this.questionList.splice(index+2,0,this.questionList[index]);
				this.questionList.splice(index,1);
				this.questionList[index].seq=index+1;
				this.questionList[index+1].seq=index+2;
			},
			//题目复用
			edit_position_copy:function(index){
				// this.questionList.splice(index,0,this.questionList[index]);
				var q = {},tmp,i;
                q.seq = this.questionList[index].seq;
                q.title = this.questionList[index].title;
                q.qtype = this.questionList[index].qtype;
                q.required = true;
                q.options = [];
                for(i=0;i<this.questionList[index].options.length;i++){
                    tmp = {};
                    tmp.content = this.questionList[index].options[i].content;
                    q.options.push(tmp);
                }
              
                // 插入到原问题的后面
                // console.log(index);
                // console.log(this.questionList.length);
                // var q=this.questionList[index];
                this.questionList.splice(index+1,0,q);
                // console.log(this.questionList.length);
				for(var i=index+1;i<this.questionList.length;i++){
					console.log(i);
					this.questionList[i].seq++;
				}
			},
			//题目删除
			edit_position_delete:function(index){
				this.questionList.splice(index,1);
				for(var i=index;i<this.questionList.length;i++){
					this.questionList[i].seq--;
				}
			},
			//创建单选题
			createques:function(type){
				var temp={};
				temp.seq=this.questionList.length+1;
				temp.title="请填入题目";
				temp.qtype=type;

				if(type=="textarea"){
					temp.options=[];
				}else{
					temp.options=[{id:1,content:"选项"}];
				}
				temp.required=false;
				this.questionList.splice(temp.seq-1,0,temp);
			},
			//检查问卷问题
			checksurvey:function(){
				var length=this.questionList.length;
				if(length<1){
					alert("至少需要一道题目");
					return false;
				}else if(length>10){
					alert("不能超过10道题目");
					return false;
				}else{//检查选项
					for(var i=0;i<length;i++){
						if(this.questionList[i].qtype!="textarea"&&this.questionList[i].options.length<2){
							alert("选题题"+(i+1)+"应至少有两个选项");
							return false;
						}
					}
					//检查日期
					if(!this.deadline){
						alert("还没填写截止日期");
						return false;
					}else{
						if(store.savesurvey(this.id,this.title,this.deadline,this.questionList)){
							return true;
						}						
					}

				}
			},
			//保存问卷
			savesurvey:function(){
				var a="20161110"; 
				var b="20161109";
				var current = new Date();
				var time2 = current.getFullYear()+"-"+(current.getMonth()+1)+"-"+current.getDate();
				var aaa=(new Date("2016-11-10"));
				console.log(aaa);
				if(a>b){
					console.log(1);
				}
				if(this.checksurvey()){
					alert("保存成功");
				}
			},
			//发布问卷
			release:function(){
				if(this.checksurvey()){
					if(store.release(this.id)){
						alert("发布成功");
						this.$route.router.go("/");
					}
				}
			}
		},
		filters:{
			questiontype:function(value){
				if(value=="radio"){
					return "(单选题)";
				}else if(value=="checkbox"){
					return "(多选题)";
				}else{
					return "(文本题)";
				}
			}
		}
	}
</script>
<!-- <style> -->

<style lang="sass">
	.editbox_container{
		background-color: #fff;
		border:1px solid #ccc;
		border-radius: 4px;
		width: 80%;
    	margin: 0 auto;
    	/*text-align: center;*/
    	padding:5px 20px;

	}
	.editbox_title input{
		font-weight: bold;
    	text-align: center;
    	margin:28px 0;
    	outline:none;
    	border:none;
    	font-size:20px;
    	width:100%;
	}
	.editbox_content{
		width:95%;
		text-align: center;
		margin:20px auto;
		border:1px solid #ccc;
		background-color: #fff;
		/*padding-top: 10px;*/
	}
	.editbox_footer{
		margin: 20px 0 30px 0;
	}
	.editbox_footer>span{
		margin-left: 40px
	}
	.editbox_footer span.right{
		margin-right: 30px;
	}
	.que_type{
		margin:15px 0;
	}
	.que_type button{
		background-color: #eee;
		border:1px solid #ccc;
		margin: 0 10px;
	}
	.que_type button:hover{
		color:#EE7419;
	}
	button.createques{
		background-color: #eee;
		width:100%;
		padding:30px;
		border:none;
		/*margin:15px 0;*/
	}
	button.createques:hover{
		color:#EE7419;
	}

	.survey_question{
		width:95%;
		margin:10px auto;
		padding:4px 20px;
	}
	.survey_question:hover{
		background-color: #FDF1E6;
		.createopt_btn,.deleteopt_btn ,.edit_position{
			visibility: visible;
		}
		.edit_option{
			background-color: #FDF1E6;
		}
		.question_input{
			background-color: #FDF1E6;
		}
		
	}
	.edit_position{
		float:right;
		margin-bottom: 5px;
		visibility: hidden;

	}
	.edit_position button{
		border:none;
		padding:2px;
		font-size: 12px;
		background-color: #FDF1E6;
	}
	.edit_position button:hover{
		color:#EE7419;
	}
	.deleteopt_btn{
		border:none;
		padding:4px 10px;
		margin-left: 20px;
		background-color: #FDF1E6;
		visibility: hidden;
		font-size: 10px;
	}
	.createopt_btn{
		visibility: hidden;
		font-size:10px;
		margin-top:10px;
		border-style:dashed;
		background-color: #FDF1E6;
	}
	.createopt_btn:hover{
		background-color:#EE7419;
	}
	.edit_option{
		outline:none;
		border:none;

	}
	.que_type i{
		margin-right: 2px;
	}
	.survey_question .question_input{
		border:none;
		outline:none;
		background-color:#fff;
	}
	.survey_question_title{
		margin-bottom: 10px;
	}


</style>