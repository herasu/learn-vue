<template>
	<div class="viewbox_container">
		<div class="viewbox_title">
			<button v-link="{path:'/'}">返回</button>
			<p>{{title}}</p>
			<!-- <input type="text" v-model="title"> -->
		</div>
		<hr/>
		<template v-for="question in questionList" track-by="$index">
			<div class="surveydata_box">
				<div class="left">
					<span>
					Q{{question.seq}}&nbsp;&nbsp;{{question.title}}&nbsp;&nbsp;&nbsp;{{question.qtype|questiontype}}
					<em v-if="question.required">*</em>
					</span>
					<template v-if="question.qtype!='textarea'">
						<div  v-for="option in question.options">
						<!-- <input type="{{question.qtype}}"> -->
							<span>{{option.id}}</span>.&nbsp;<input type="text" v-model="option.content" class="edit_option">
						</div>
					</template>
				</div>
				<div class="right">
					<div id="chart-{{$index}}" style="height: 300px;width:450px;"></div>
				</div>
				
				<div style="clear:both"></div>
				
			</div>
		</template>
		<hr/>
		<div class="viewbox_footer">
			<div class="center"><button class="return" v-link="{path:'/'}">返回</button></div>
		</div>
	</div>
</template>

<script type="text/javascript">
import store from './store.js';
var echarts=require("echarts");
	export default{
		data(){
			var surveydata=store.fetchsurvey(this.$route.params.id);
			// alert(surveydata.status);
			return{
				title:surveydata.title,
				questionList:surveydata.questionList,
				respondents:surveydata.respondents,
				charts:[]
			}
		},
		methods:{

		},
		ready:function(){
			var chartsoptions=[];
			var chartsData=[];
			for (var i = 0; i <this.questionList.length; i++) {
				var option={};
				// option.title = { text : this.questionList[i].seq+"."+this.questionList[i].title };
				option.tooltip = {};
			// 对于多选题
				if(this.questionList[i].qtype === "checkbox"){
					option.tooltip={trigger:'axis',axisPointer:{type:'shadow'}};
					option.xAxis={type:'value'};
					var optiondata=[];
					var seriesdata=[];
					for(var j=0;j<this.questionList[i].options.length;j++){
						// 每个选项的内容
						optiondata.push(this.questionList[i].options[j].content);
						seriesdata.push(0);
					}
					chartsData.push(seriesdata);
					option.grid={width:'60%',right:"0%"};
					option.yAxis={type:"category",data:optiondata};
					option.series = [{name:"人数",type:"bar",data:[]}];
				}
				// 对于单选题
				else if(this.questionList[i].qtype === "radio"){
					// 统计选择该问题各个选项的人数
					option.tooltip={trigger:'item',formatter: "{b} : {c}人 ({d}%)"};
					// 获取各个选项的名字
					// option.xAxis = {data:[]};
					var optiondata=[];
					for(var j=0;j<this.questionList[i].options.length;j++){
						optiondata.push({value:0,name:this.questionList[i].options[j].content});
					}
					chartsData.push(optiondata);
					option.series=[{name:"人数",type:"pie",data:optiondata}];					
				}
				// 对于文本题，用条形展现有效回答人数
				else{
					option.grid={width:'60%',right:"0%"};
					option.tooltip={trigger:'axis',axisPointer:{type:'shadow'}};
					option.xAxis={type:'value'};
					var optiondata=["有效回答","无效回答"];
					chartsData[i]=[0,0];
					option.yAxis={type:"category",data:optiondata};
					option.series = [{name:"人数",type:"bar",data:[]}];
				}
			// 添加该题的配置
				chartsoptions.push(option);
			}
			for(var i=0;i<this.questionList.length;i++){
				//如果这题是单选
				if(this.questionList[i].qtype==="radio"){
					for(var j=0;j<this.respondents.length;j++){
						if(isNaN(this.respondents[j][i])||this.respondents[j][i]==0){

						}else{
							chartsData[i][this.respondents[j][i]-1].value+=1;
						}
					}
				}
				//如果是多选
				else if(this.questionList[i].qtype==="checkbox"){
					for(var j=0;j<this.respondents.length;j++){
						for(var k=0;k<this.respondents[j][i].length;k++){
							if(isNaN(this.respondents[j][i][k])){
							}else{
								// console.log(chartsData[i][this.respondents[j][i][k]-1]);
								chartsData[i][this.respondents[j][i][k]-1]+=1;
								// console.log(chartsData[i][this.respondents[j][i][k]-1].value);
							}
						}
					}
				}
				//文本题
				else{
					for(var j=0;j<this.respondents.length;j++){
						if(this.respondents[j][i]!=""){
							chartsData[i][0]+=1;
						}else{
							chartsData[i][1]+=1;
						}
					}
				}
			}
		//  将数据添加到图表配置里，初始化图表
			var chart;
			for(i=0;i<chartsoptions.length;i++){
				chartsoptions[i].series[0].data = chartsData[i];
				chart = echarts.init(document.getElementById("chart-"+i));
				chart.setOption(chartsoptions[i]);
				console.log(chartsoptions[i]);
				this.charts.push(chart);
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
	.viewbox_container{
		background-color: #fff;
		border:1px solid #ccc;
		border-radius: 4px;
		width: 80%;
    	margin: 0 auto;
    	/*text-align: center;*/
    	padding:5px 20px;

	}
	.viewbox_title p{
		font-weight: bold;
    	text-align: center;
    	margin:0px 0 28px 0;
    	width:100%;
	}
	.viewbox_title button{
		margin-top:5px;
		margin-left: 10px;
		border:none;
		color:#666;
	}
	.viewbox_content{
		width:95%;
		text-align: center;
		margin:20px auto;
		border:1px solid #ccc;
		background-color: #fff;
		/*padding-top: 10px;*/
	}
	.viewbox_footer{
		margin: 20px 0 30px 0;
	}

	button.return{
		background-color: #F07600;
		color:#fff;
		text-align: center;
		padding:4px 20px;
	}
	button.return:hover{
		background-color: #FDF1E6;
		color:#000;
	}
	.surveydata_box{
		width:90%;
		margin:15px auto;
		border:1px solid #ccc;
		border-radius: 2px;
		padding:10px 20px 10px;
	}
	.surveydata_box .left div{
		margin-top: 5px;
		margin-left: 15px;
	}
	

</style>