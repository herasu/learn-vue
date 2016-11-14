<template>
  <div>
    <header>
      <div class="h_title">
        <span><i class="fa fa-question-circle"></i>问卷调查</span>
        <span class="title_small"><a href="" v-link="{path:'/'}">我的问卷</a></span>
      </div>
    </header>

    <div id="container">
      <router-view></router-view> 
    </div>
  </div>
</template>

<style>
  header .h_title .title_small a{
    color:#fff;
    text-decoration: none;
  }
</style>

