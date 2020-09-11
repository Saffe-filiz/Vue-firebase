

import * as firebase from "firebase";     
import VueFirebase from 'vue-firebase'

const firebaseConfig = {

    apiKey: "AIzaSyBdJmCp1YNkhpWxaBNEtMLrrsJ9_c6B-Rw",
    authDomain: "vue-form-dee03.firebaseapp.com",
    databaseURL: "https://vue-form-dee03.firebaseio.com",
    projectId: "vue-form-dee03",
    storageBucket: "vue-form-dee03.appspot.com",
    messagingSenderId: "830529960945",
    appId: "1:830529960945:web:c9be11bce9ecf3ee11a250"

 };
 
let data = firebase.initializeApp(firebaseConfig);
export let db = data.database();
