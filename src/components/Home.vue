<template>
	<div>
		<loading v-if="!detail"/>
		<div class="home" v-if="detail">
			<div class="main-content-div">				
				<Post v-for="posts in allPost" :key="posts.postID" :userID="posts.userID" :post="posts" 
				:authID="authID"/>
				<InfiniteScroll @intersect="intersected"/>
			</div>  
			<SendPost :authID="authID"/>
		</div>
	</div>
</template>

<script>
	import '../assets/css/home.css';
	import { authID } from '../mixins/mixin.js';
	import InfiniteScroll from './InfiniteScroll.vue';
	import SendPost from './SendPost.vue';
	import loading from './loading.vue';
	import { db } from '../firebase.js';
	import Post from './Post.vue';
	


	export default {
		name: 'Home',

		data () {
			return {
				allPost: [],
				detail: false,
				posts: 0,
			}
		},

		mixins: [authID],

		

		components: {
		    loading,
		    InfiniteScroll,
		    SendPost,
		    Post,
		},

		created (){
			this.intersected();
		},

	    methods: {

			intersected () {

				db.ref(`posts/`).on('value', snapshot => { 
					let data = Object.values(snapshot.val())
					this.allPost = data;
					this.allPost.reverse().slice(-(this.posts += 5));
					this.detail = true;
				    })
				
			},
	    },
	}
</script>
