import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';      
import Router from './Router/Router.js';
import * as firebase from "firebase";  
import 'babel-polyfill';


Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter(Router)

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(requiresAuth && !!currentUser){  
    next('/')
  }else {
    next()
  }
});

Vue.filter('date', value => {
        let firstDate = new Date(value)
        let lastDate = new Date(); 
        let time = lastDate - firstDate;
        let seconds =  Math.round(time /= 1000)
        let minutes = Math.floor(seconds / 60)
        let hours = Math.floor(minutes / 60)
        let day = Math.round((lastDate - firstDate) / (1000 * 60 * 60 * 24));
        let month = firstDate.toLocaleString('en-GB', { month: 'long', day: 'numeric'});
        let year = firstDate.toLocaleString('en-GB', {year: 'numeric', month: 'long'});
        
        return seconds < 60 ? 'Now': minutes < 60 ? `${minutes} Minutes`: 
        hours < 24 ? `${hours} Hours`: day < 30 ? month: year
});

let app; 

export const bus = new Vue();

firebase.auth().onAuthStateChanged( user => {
  if(!app){
    app = new Vue({
      el: '#app',
      router,
      render: h => h(App)
    })
  }
})



