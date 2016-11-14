<template>
	<div class="editbox_container">
		<div class="editbox_title">
			<p>{{title}}</p>
			<!-- <input type="text" v-model="title"> -->
		</div>
		<hr/>
		<template v-for="question in questionList" >
			<div class="survey_question">
				<p>
					Q{{question.seq}}&nbsp;&nbsp;{{question.title}}&nbsp;&nbsp;&nbsp;{{question.qtype|questiontype}}
					<em v-if="question.required">*</em>
				</p>
				<div v-if="question.qtype=='textarea'">
					<textarea class="trea" cols="70" rows="4" v-model="result[$index]"></textarea>
				</div>
				<div v-else>
					<div  v-for="option in question.options">
						<input type="{{question.qtype}}" :id="question.seq+'_'+option.id" :name="question.seq" :value="option.id" v-model="result[question.seq-1]">
						<label :for="question.seq+'_'+option.id"> 
							{{option.content}}
						</label>
					</div>
				</div>
				<div style="clear:both"></div>
				
			</div>
		</template>
		<hr/>
		<div class="editbox_footer center">
			<button class="submit_data" @click="submit">提交数据</button>
		</div>
	</div>
</template>

<script type="text/javascript">
import store from './store.js';
	export default{
		data(){
			var surveydata=store.fetchsurvey(this.$route.params.id);
			var result_raw=[];
			for (var i = 0; i < surveydata.questionList.length; i++) {
				if(surveydata.questionList[i].qtype=="radio"){
					result_raw.push(0);
				}else if(surveydata.questionList[i].qtype=="checkbox"){
					result_raw.push([]);
				}else{
					result_raw.push("");
				}
			};
			// alert(surveydata.status);
			return{
				show_quetype:false,
				title:surveydata.title,
				questionList:surveydata.questionList,
				status:surveydata.status,
				id:this.$route.params.id,
				result:result_raw
			}
		},
		methods:{
			submit:function(){
				//检查选项
				if(this.status!="in"){
					alert("问卷未发布或已结束，填写无效！");
					// this.$route.router.go("/");
					return false;
				}else{
								// console.log(this.result);

					for (var i = 0; i < this.questionList.length; i++) {
						if(this.questionList[i].required){
							if(this.result[i]==0||this.result[i]==[0]){

								alert("题目"+(i+1)+"是必填题");
								return false;
							}
						}
					};
					// console.log(this.result);
					if(store.submitdata(this.id,this.result)){
						alert("提交成功");
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
	.editbox_title p{
		font-weight: bold;
    	text-align: center;
    	margin:28px 0;
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
	.submit_data{
		padding:6px 20px;
		background-color: rgb(253,241,230);
	}


</style>