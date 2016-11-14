const key = "test";
var newId = 4;
var data;

function initData(){
	data={
		user:[
			{
				id:1,
				name:"admin",
				own:[1,2,3]
			}
		],
		surveylist:[
			{
				id:1,
				owner:1,
				title:"关于24小时书店的调查",
				status:"in",
				time:"2016-10-30",
				deadline:"2016-11-5",
				questionList:[
					{
						seq:1,
						title:"您的性别",
		                qtype:"radio",
		                required:true,
		                options:[
		                    {id:1,content:"男"},
		                    {id:2,content:"女"}
		                ]
					},{
		                seq:2,
		                title:"您平时看书频率是怎么样",
		                qtype:"radio",
		                required:true,
		                options:[
		                    {id:1,content:"每天都看"},
		                    {id:2,content:"一周3-4次"},
		                    {id:3,content:"看的较少"}
		                ]
		            },
		            {
		                seq:3,
		                title:"您觉得24小时书店有必要吗",
		                qtype:"radio",
		                required:true,
		                options:[
		                    {id:1,content:"有必要"},
		                    {id:2,content:"没有必要"},
		                    {id:3,content:"无所谓"}
		                ]
		            },
		            {
						seq:4,
		                title:"您觉得24小时书店吸引您的地方有哪些",
		                qtype:"checkbox",
		                required:true,
		                options:[
		                    {id:1,content:"看书无时间限制"},
		                    {id:2,content:"经常有讲座等活动"},
		                    {id:3,content:"氛围很好"},
		                    {id:4,content:"很有情调"},
		                    {id:5,content:"装修不错"}
		                ]
		            },
		            {
		                seq:5,
		                title:"您对本问卷有什么评价和建议？",
		                required:false,
		                qtype:"textarea",
		                options:[]
		            }
				],
				respondents:[]
			},
			{
				id:2,
				owner:1,
		        title:"大学生网购调查问卷",
		        status:"after",
		        time:"2016-11-2",
		        deadline:"2016-11-6",
		        questionList:[
		            {
		                seq:1,
		                title:"您现在所在年级",
		                qtype:"radio",
		                required:true,
		                options:[
		                    {id:1,content:"大一"},
		                    {id:2,content:"大二"},
		                    {id:3,content:"大三"},
		                    {id:4,content:"大四及以上"},
		                    {id:5,content:"研究生及以上"}
		                ]
		            },
		            {
		                seq:2,
		                title:"你选择网络购物的主要原因是",
		                qtype:"checkbox",
		                required:true,
		                options:[
		                    {id:1,content:"方便快捷，节省时间"},
		                    {id:2,content:"品种齐全"},
		                    {id:3,content:"价格便宜"},
		                    {id:4,content:"时尚有趣"},
		                    {id:5,content:"选择齐全"},
		                    {id:6,content:"打发时间"}
		                ]
		            },
		            {
		                seq:3,
		                title:"你平时网购的频率是？",
		                qtype:"radio",
		                required:true,
		                options:[
		                    {id:1,content:"每天一次或以上"},
		                    {id:2,content:"每周2－3次"},
		                    {id:3,content:"每周1次"},
		                    {id:4,content:"每月5－6次"},
		                    {id:5,content:"每月2－3次"},
		                    {id:6,content:"其他"}
		                ]
		            },
		            {
		                seq:4,
		                title:"你对大学生网购有何意见或建议？",
		                required:false,
		                qtype:"textarea",
		                options:[]
		            }
		        ],
		        respondents:[
		        	[1,[1,3,5],2,"啦啦啦啦啦啦啦"],
			        [2,[2,3,4,6],3,"就不告诉你"],
			        [3,[2,4,5],4,""],
			        [4,[1,3,6],1,""],
			        [5,[1,2,4,5],2,""],
			        [4,[2,3,4],3,""],
			        [5,[2,3,4],2,""],
			        [3,[1,3,5],4,""],
			        [3,[1,3,5],5,""],
			        [2,[1,3,5],6,""],
			        [2,[2,3,5],2,""],
			        [1,[2,3,5],2,"没有"],
			        [1,[2,3,5],3,"有哟哟哟哟哟"],
			        [5,[2,3,5],3,"啦啦啦啦"],
			        [2,[2,3,5],2,""]
		        ]
			},
			{
				id:3,
				owner:1,
		        title:"关于大学生毕业旅行的调查",
		        status:"before",
		        time:"2016-11-7",
		        deadline:"2016-11-10",
		        questionList:[
		            {
		                seq:1,
		                title:"您的性别",
		                qtype:"radio",
		                required:false,
		                options:[
		                    {id:1,content:"男"},
		                    {id:2,content:"女"},
		                ]
		            },
		            {
		                seq:2,
		                title:"您对毕业旅行有所期待吗",
		                qtype:"checkbox",
		                required:true,
		                options:[
		                    {id:1,content:"有很大期待"},
		                    {id:2,content:"一点点期待"},
		                    {id:3,content:"没有期待"}
		                ]
		            },
		            {
		                seq:3,
		                title:"您会选择哪里作为毕业旅行",
		                qtype:"checkbox",
		                required:true,
		                options:[
		                    {id:1,content:"大西北"},
		                    {id:2,content:"新疆或西藏"},
		                    {id:3,content:"江南风光"},
		                    {id:4,content:"海岛"},
		                    {id:5,content:"土耳其"},
		                    {id:6,content:"非洲"},
		                    {id:7,content:"欧洲"},
		                    {id:8,content:"其他"}
		                ]
		            }
		        ],
		        respondents:[]
			}

		]
	};
	localStorage.setItem("test", JSON.stringify(data));
}

function fetch () {
	// var aaa=JSON.parse(localStorage.getItem("test"));
	// alert(aaa);
	return JSON.parse(localStorage.getItem("test"));
}
//返回指定问卷的数据
function fetchsurvey(id){
	var data=fetch();
	for(var i=0;i<data.surveylist.length;i++){
		if(data.surveylist[i].id==id){
			// alert(data);
			return data.surveylist[i];
		}
	}
}
function newsurvey(id,owner){
	var temp = {id:id,owner:owner,title:"我的问卷",status:"before",time:null,deadline:null,questionList:[],respondents:[]}
	data.surveylist.push(temp);
	localStorage.setItem("test", JSON.stringify(data));
}
function savesurvey(id,title,deadline,questionList){
	for(var i=0;i<data.surveylist.length;i++){
		if(id==data.surveylist[i].id){
			data.surveylist[i].title=title;
			data.surveylist[i].deadline=deadline;
			data.surveylist[i].questionList=questionList;
			localStorage.setItem("test", JSON.stringify(data));
			return true;
		}
	};
	return false;
}
function release(id){
	for(var i=0;i<data.surveylist.length;i++){
		if(id==data.surveylist[i].id){
			var current = new Date();
			data.surveylist[i].status = "in";
			data.surveylist[i].time = current.getFullYear()+"-"+(current.getMonth()+1)+"-"+current.getDate();
			localStorage.setItem("test", JSON.stringify(data));
			return true;
		}
	};
	return false;
}

function submitdata(id,temp){
	for(var i=0;i<data.surveylist.length;i++){
		if(id==data.surveylist[i].id){
			data.surveylist[i].respondents.push(temp);
			localStorage.setItem("test", JSON.stringify(data));
			console.log(data);
			return true;
		}
	};
	return false;
}
initData();
export default{
	initData,
	fetch,
	fetchsurvey,
	newsurvey,
	savesurvey,
	release,
	submitdata
};
