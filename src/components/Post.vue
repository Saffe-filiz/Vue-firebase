<template>
	<div v-if="detail">
		<div class="popop-background" v-if="removeCart" @click="removeCart = !removeCart"></div>
		<div class="post-contanier">
			<div class="user-img">
				<img src="../assets/img/avatar.png" width="70">
			</div>
			<transition name="fade" appear>
				<div class="massage">
					<div class="username-date">
						<router-link :to="`/${post.username}`">
							<h2>{{post.username}}</h2>
						</router-link>
						<h4>{{post.postDate | date}}</h4>
					</div>
						<p>{{post.post}}</p>
				</div>
			</transition>
			<div class="like-and-comment-icon">
				<SendLike :post="post"/>
			</div>
			<span v-if="showicon">
				<div id="post-delet-icon">
					<img title="Delete" src="../assets/img/delete.png" 
					@click="removeCart = !removeCart" width="25">
				</div>
				<transition name="fade" appear>
				<div class="removeCart" v-if="removeCart">
					<p>Are you sure you want to delete this post ?</p>
					<div class="removeButton">
						<button id="deletButton" @click="removePost">Delet</button>
						<button id="cencelButton" @click="removeCart = false">
						Cencel</button>
					</div>
				</div>
			</transition>
			</span>
		</div>
	</div>
</template>

<script>
	import '../assets/css/post.css';	
	import { db } from '../firebase.js';
	import SendLike from './SendLike.vue';

	export default {
		name: 'Post',

		props: ['userID','authID','post'],


		data () {
			return {
				removeCart: false,
				detail: false,
				postData: '',
				postKeyID: '',
			}
		},

		components: {
			SendLike,
		},

		mounted () {
		    this.postRawData;	
		},

		methods: {

			removePost () {
				db.ref(`posts/${this.postKeyID}`).remove();
				this.removeCart = false
			},
		},

		computed: {
			
			postRawData () {
				
			return 	db.ref(`posts/`).on('value', snapshot =>  {
                        let data = snapshot.val() || {};
                        this.postData = data;
                        this.detail = true;
                });	
				
			},

			showicon () {
				return this.userID == this.authID 
			},

	    },

	    watch: {
	    	postData (value) {
	    		let postID = this.post.postID
	    		this.postKeyID = Object.keys(value).filter( v => value[v].postID == postID);
	    	}
	    },
    }
</script>