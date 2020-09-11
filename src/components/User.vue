<template>
	<div>
		<loading v-if="loading"/>
		<div  v-if="detail">
			<div class="user-profile">
				<div class="user-content">
					<span  class="user-avatar"><img src="../assets/img/avatar.png" width="70"></span>	
					<span id="username-date"><h2>{{user.username}}</h2><h5>{{user.date}}</h5></span>
					<FollowerList :authID="authID" :userID="user.userID"/>
				</div>
				<Post v-for="post in allPost" :key="post.postID" 
				:userID="post.userID" 
				:post="post" 
				:authID="authID"/>
			</div>
			<Follow v-show="!showButtons" :authID="authID" :userID="user.userID"/>
			<SendPost v-show="showButtons" :authID="authID" :username="user.username"/>
		</div>
		<InfiniteScroll @intersect="intersected"/>
	</div>
</template>

<script>
	import '../assets/css/user.css'
	import InfiniteScroll from './InfiniteScroll.vue';
	import { db } from '../firebase.js';
	import { authID } from '../mixins/mixin.js';
	import loading from './loading.vue';
	import Follow from './Follow.vue';
	import FollowerList from './FollowerList.vue';
	import Post from './Post.vue';
	import SendPost from './SendPost.vue';


	export default {
		name: 'User-Profile',

		data () {
			return {
				user: [],			
				loading: true,
				userDetail: false,
				postDetail: false,
				post: 0,
				allPost: [],	
			}
		},

		components: {
			loading,
			InfiniteScroll,
			FollowerList,
		    Follow,
		    Post,
		    SendPost,
		},

		mixins: [authID],

		created () {
			this.intersected();
			this.userData();
			
		},

		methods: {

			userData () {
				let username = this.currentUsername()

				db.ref(`users/`).on('value', snapshot => {

					Object.values(snapshot.val()).forEach( value => {
						if(value.username == username){
							this.user = value;
							this.userDetail = true;
							this.loading = false;
						};
					})
					
				});
			},
			
		
			intersected () {
				let authID = this.authID;
				let userID = this.user.userID;

				db.ref(`posts/`).on('value', snapshot => {
					let data = snapshot.val() || {};
					this.allPost = Object.values(data)
					    .filter( v => v.userID == userID).reverse().slice(-(this.post += 5));
					    this.postDetail = true;  	
				})
			},

			currentUsername () {
				return this.$route.params.username;
			},
		},

		computed: {

			detail () {
				return this.userDetail && this.postDetail == true
			},

			showButtons () {
				return this.authID !== null && this.authID == this.user.userID
			},
		}
	}
	
</script>