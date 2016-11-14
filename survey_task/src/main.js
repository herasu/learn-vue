import Vue from 'vue'
import VueRouter from "vue-router"
import App from './app.vue'
import surveylist from './surveylist.vue'
import alertbox from './alertbox.vue'
import editsurvey from './editsurvey.vue'
import viewsurvey from './viewsurvey.vue'
import viewdata from './viewdata.vue'


// new Vue({
//   el: '#container',
//   components: { surveylist }

// })

Vue.use(VueRouter);
var router = new VueRouter();

// 每条路由规则应该映射到一个组件
router.map({
	"/":{
		component:surveylist
	},
	"/edit/:id":{
		name:"edit",
		component:editsurvey
	},
	"/viewdata/:id":{
		name:"viewdata",
		component:viewdata
	},
	"/viewsurvey/:id":{
		name:"viewsurvey",
		component:viewsurvey
	}
});

router.beforeEach(function () {
  window.scrollTo(0, 0);
});
// var App = Vue.extend({});
router.start(App,"#app");