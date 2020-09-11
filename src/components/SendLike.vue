<template>
	<div>
		<div id="like-icon" @click="sendLike">
			<img title="Like" src="../assets/img/like.png" width="25">
			<p>{{numberOfLikes}}</p>
		</div>
	</div>
</template>

<script>

	import '../assets/css/send-like.css';
	import { db } from '../firebase.js'
	import { authID, template, username, notifications } from '../mixins/mixin.js';
	
	export default {
		name: 'Send-Like',

		props: ['post'],
		mixins: [authID, username, template, notifications],

		data () {
			return {
				likeData: [],
				likeKeyID: null,
				didHeLike: null,
				numberOfLikes: 0,
				postID: this.post.postID,
			}
		},

		mounted () {
		    this.likeDataRaw;
		    this.notificationsRawData(this.post.userID)
		},

		methods: {
			
			sendLike () {
				let postID = this.postID;
				let userID = this.post.userID;
				let template = this.template;
				template.type = 'Like';
				template.postID = this.post.postID;

				
				if(!this.didHeLike){
					db.ref(`likes/${userID}/${postID}/`).push(template);

					if(userID !== this.authID && this.didItSendLike == false){
						db.ref(`notifications/${userID}`).push(template);
					}
				}else{
					db.ref(`likes/${userID}/${postID}/${this.likeKeyID}`).remove();
				}
			},
		},

		computed: {

			likeDataRaw () {
				let authID = this.authID;
				let postID = this.postID;
				let userID = this.post.userID;

		     	return db.ref(`likes/${userID}/${postID}/`).on('value', snapshot => {
					   let data = snapshot.val()
					   this.likeData = data || {}
				});
			},	
		},

		watch: {

			likeData (value) {
				let result = false;
				let sefl = Object.keys(value);
				this.likeKeyID = sefl.filter( v => value[v].userID == this.authID);
				this.numberOfLikes = sefl.length;
				Object.values(value).forEach( v => {
					if(v.userID == this.authID){
						return result = true;
					}
				})
				return this.didHeLike = result;
			},
		}
    }
</script>