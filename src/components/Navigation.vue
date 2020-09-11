<template>
    <div class="navigation-contanier">
    	<nav>
    		<div class="list">
    			<ul v-if="login">
    				<li>
    					<router-link @click.native="singOut()"to="/">Sing Out</router-link>
    				</li>
    				<li  v-if="detail">
    					<router-link :to="`/${username}`">{{username}}</router-link>
    				</li>
    				<li>
    					<img @click="showNotifications = !showNotifications" src="../assets/img/bell.png" width="30">
                        <!--<span v-show="notificationViewed" id="notification"></span>-->
                    </li>
                        <li>
                        <router-link to="/">Home</router-link>
                    </li>
                </ul>
                <ul v-if="!login">
                    <li>
                        <router-link to="/register">Sing Up</router-link>
                    </li>
                    <li>
                        <router-link @click.native="chanceComponents()" to="/login">Sing In</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <transition name="fade" appear>

                <Notifications 
                v-show="showNotifications"
                @mouseleave.native="showNotifications = false" 
                :authID="authID"
                :key="authID"/>
            
        </transition>
    </div>
</template>

    <script>
    	import '../assets/css/navigation.css';
        import firebase from 'firebase';
    	import { db } from '../firebase.js';
        import { bus } from '../main.js';
    	import Notifications from './Notifications.vue';


    	export default {
    		name: 'Nav',

    		data () {
    			return {
    				login: false,
    				detail: false,
                    showNotifications: false,
                    username: '',
                    authID: null
                }
            },

            components: {
             Notifications,
         },

         created () {
             firebase.auth().onAuthStateChanged( user => { 
                this.login = !!user;
                if(user !== null){
                    db.ref(`users/${user.uid}`).on('value', snapshot => {
                        let data = snapshot.val();
                        this.authID = data.userID;
                        this.username = data.username;
                        this.detail = true;
                    })
                }
            });	
         },

         methods: {

            singOut () {
                firebase.auth().signOut().then(() => {
                   this.$router.push({name: 'Login'});
                   this.showNotifications = false;
               })
                .catch( error => console.log(error));
            },

            chanceComponents () {
                bus.$emit('chance', false);
            },

        }, 
    }
</script>