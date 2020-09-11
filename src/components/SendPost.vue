<template>
	<div v-if="authID !== null">
	    <button id="post-button" @click="textarea = true">
		     <img title="Send" src="../assets/img/send.png" width="30">
	    </button>
	<div class="popop-background" v-show="textarea" @click="textarea = false">
		<div class="post-textarea" v-show="textarea" @click.stop>
			<p v-if="error">sdasdadasdsa</p>
			<textarea v-model="post"></textarea>
			<button @click="sendPost">Send</button>
		    </div>
		</div>
    </div>

</template>


<script>
	import '../assets/css/send-post.css';
	import { username } from '../mixins/mixin.js';
	import { db } from '../firebase.js';
	
	export default {
		name: 'Send-Post',

		props: ['authID'],

		mixins: [username],

		data () {
			return {
				post: '',
				textarea: false,
				error: false,
			}
		},

		methods: {
			sendPost () {

				if(this.post !== '' && this.authID !== null && this.post.length < 100 && this.post.length > 3){
					db.ref(`posts/`).push({
						userID: this.authID, 
						postID: db.ref().push().key, 
						postDate: `${new Date()}`, 
						username: this.username, 
						post: this.post,
						commit: [], 
					});
					this.textarea = false;
					this.post = '';
				}else {
					alert('Must have a minimum of 3 characters and a maximum of 100 characters')
				}
			},
		},
	}

</script>