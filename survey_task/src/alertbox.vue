<template>
		<div class="alertbox_bg">
		<div class="alertbox_container">
			<div class="alertbox_title">
				<span>提示</span>
				<span class="right"><button class="button_none" @click="cancel"><i class="fa fa-times"></i></button></span>
			</div>
			<div class="alertbox_content">
				<p>{{content}}</p>
				<div class="center">
					<button @click="confirm" class="yellow">确认</button>
					<button @click="cancel">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:["title","content"],
		data(){
			return{
			}
		},
		methods:{
			cancel:function(){
				this.$dispatch("alertchoice","cancel");
			},
			confirm:function(){
				this.$dispatch("alertchoice","ok");
			}

		}
	}
</script>

<style>
	.alertbox_bg{
		background-color: rgba(0,0,0,0.5);
		z-index: 1000;
		width:100%;
		height:100%;
		position:fixed;
		top:0;
		left:0;

	}
	.alertbox_container{
		margin:0 auto;
		margin-top: 100px;
		border-radius: 3px;
		background-color: #fff;
		width: 360px;
	    padding: 0 0 10px 0;
	    position: fixed;
	    top: 32%;
	    left: 40%;
	}
	.right{
		float: right;
	}
	.alertbox_title{
		background-color: #F7F7F7;
		padding: 4px 0 4px 12px;
    	border-radius: 4px 4px 0 0;
	}
	.alertbox_content{
		padding: 4px 15px;
	}
	.alertbox_title>span{
		font-weight: bold;
	}
	.center{
		text-align:center;
	}
	.button_none{
		border:none;
		background-color:#f7f7f7;

	}
</style>