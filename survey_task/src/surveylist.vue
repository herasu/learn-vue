<template>	
	<alertbox v-if="alertbox_show" :title="alertboxTitle" :content="alertboxContent"></alertbox>
	<table v-if="surveylist.length>0">
		<thead>
			<tr>
				<th></th>
				<th>
					标题
				</th>
				<th>
					时间
				</th>
				<th>
					状态
				</th>
				<th style="padding-bottom: 8px;">
					操作
					<button class="new_btn" style="" @click="newsurvey">+ 新建问卷</button>
				</th>
			</tr>
		</thead>
		<tbody>
			<template v-for="item in surveylist">
				<tr class="survey_item">
					<td><input type="checkbox" v-model="survey_check" v-bind:value="item.id" name="survey"></td>
					<td>{{item.title}}</td>
					<td>{{item.time}}</td>
					<td class="{{item.status}}">{{item.status | survey_status}}</td>
					<td>
						<!-- <template v-if="item.status=='in'"> -->
							<button @click="edit(item.id)" v-if="item.status=='before'">编辑</button>
							<button @click="viewdata(item.id)" v-else>查看数据</button>
						<!-- </template> -->
							<button @click="viewsurvey(item.id)">查看问卷</button>
							<button @click="deletesurvey(item.id,item.title)">删除</button>
					</td>
				</tr>
			</template>
			<tr >
				<td><input type="checkbox" id="full_choose" @change="choose_all" v-model="chosen_all"></td><!-- 注意，使用是change不是click -->
				<td colspan="4" style="padding-left: 0;border-bottom: none;padding-bottom: 60px">
					<label for="full_choose" style="margin-right:15px">全选</label>
					<button @click="mult_delete">删除</button>
				</td>	
			</tr>
		</tbody>
	</table>

<div v-else class="buildsurvey_page">
	<button class="new_btn_big" style="" @click="newsurvey">+ 新建问卷</button>
</div>
</template>

<script>
import alertbox from "./alertbox.vue";
import store from "./store.js";
// alert(store.initData);
export default{
	components:{
		"alertbox":alertbox
	},
	data(){
		// store.initData();
		var surveylist=store.fetch().surveylist;
		return{
			alertbox_show:false,
			chosen_all:false,
			survey_check:[],
			alertboxTitle:"提示",
			alertboxContent:"",
			chooseid:0,
			newid:surveylist.length,
			surveylist:surveylist,
			isActive:false
			// [
			// { id:1,title:"关于24小时书店的调查",time:"2016-10-30 16:37:24",status:"in"},
			// { id:2,title:"关于大学生创业的调查",time:"2016-10-29 16:37:24",status:"before"},
			// { id:3,title:"关于辞职旅行的调查",time:"2016-10-28 16:37:24",status:"after"}
			// ]
			
		}
	},
	methods:{
		newsurvey:function(){
			this.newid++;
			store.newsurvey(this.newid,1);
			this.$route.router.go({name:"edit",params:{id:this.newid}});
		},
		choose_all:function(){
			//另一种写法
			// while(this.survey_check.pop());
			this.survey_check=[];
			if(this.chosen_all){
				for(var i=0;i<this.surveylist.length;i++){
					this.survey_check.push(this.surveylist[i].id);
				}
			}
		},
		mult_delete:function(){
			if(this.survey_check.length===0){
				alert("请先选中要删除的问卷");
			}else{
				this.alertboxContent="确认要删除这些问卷？";
				this.chooseid="multi";//批量删除
				this.alertbox_show=true;
				// var j=0;
			}
		},
		edit:function(id){
			this.$route.router.go({name:"edit",params:{id:id}});
		},
		deletesurvey:function(qid,title){
			// alert(2);
			this.alertboxContent="确认要删除"+title+"问卷？";
			this.chooseid=qid;
			this.alertbox_show=true;
		},
		viewdata:function(id){
			this.$route.router.go({name:"viewdata",params:{id:id}});
		},
		viewsurvey:function(id){
			this.$route.router.go({name:"viewsurvey",params:{id:id}});
		}
	},
	events:{
		alertchoice:function(msg){
			if(msg==="cancel"){
				//this.alertbox_show=false;
			}else{
				if(this.chooseid==="multi"){
					for(var i=0;i<this.survey_check.length;i++){
						for(var j=0;j<this.surveylist.length;j++){
							if(this.surveylist[j].id==this.survey_check[i]){
								this.surveylist.splice(j,1);
							}
						}
						// j=j-1;
					}
				}else{
					//if(store.deleteQuestionnaire(this.currentQid)){
	                // 更新问卷列表数据
	                //    this.qList = store.fetch().questionnaireList;
	                //}else{
	                //    alert("删除失败，问卷id不存在");
	                //}
					for(var i=0;i<this.surveylist.length;i++){
						if(this.chooseid==this.surveylist[i].id){
							this.alertbox_show=false;
							return this.surveylist.splice(i,1);
						}
					}
				}
			}
			this.alertbox_show=false;
		}
	},
	filters:{
		//问卷状态
		survey_status:function(value){
			
			if(value=="in") 
			{
				this.isActive=true; 
				return "发布中";
			}else if(value==="before"){
				this.isActive=false;
				return "未发布";
			}else if(value==="after"){
				this.isActive=false;
				return "已结束";
			}else{
				this.isActive=false;
				return "状态错误";
			} 
		}
	}
}

</script>

<style>
		table{
			margin:0 auto;
			border-spacing: 0;
    		border-collapse: collapse;
			/*display:table-cell;*/
			/*vertical-align: middle;*/
		}
		
		table>thead>tr>th {
    		vertical-align: bottom;
    		text-align: left;
    		/*border-bottom: 2px solid #ddd;*/
    		padding-bottom: 12px;
    		padding-left: 15px;
    	}
		table tbody{
			border-left: 20px solid #fdfdfd;
			border-right:20px solid #fdfdfd;
			background-color:#FDFDFD;
    		padding-bottom: 50px;


		}
		table tbody td{
			/*border:none;*/
			padding:15px;
			font-size: 16px;
			font-family: "微软雅黑";
			line-height: 1.42857143;
    		vertical-align: top;
    		text-align: left;
    		border-bottom: 1px solid #ddd

		}
		table tbody tr.survey_item:hover{
			background-color: #FBEFE4;
		}
		button{
			    padding: 4px 10px;
			    background-color: #fff;
			    margin-right: 6px;
			    border: 1px solid #D6D6D6;
			    font-size: 14px;
		}
		button:hover{
			background-color: #EE7419;
			color:#fff;
		}
		button.new_btn{
			margin-left:130px;background-color: #EE7419;color:#fff;
		}
		button.yellow{
			background-color: #EE7419;color:#fff;
		}
		.full{
			margin:0 auto;
			background-color:#fdfdfd;
		}
		.buildsurvey_page{
			background-color: #fff;
			width:60%;
			height:200px;
			margin:0 auto;
			position:relative;
		}
		.buildsurvey_page button.new_btn_big{
			font-size:20px;
			background-color: #EE7419;color:#fff;
			position:absolute;
			top:42%;
			left:42%;
		}
		.survey_item td.in{
			color:#87EB7B;
		}

</style>