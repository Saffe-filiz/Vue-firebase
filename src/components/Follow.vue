<template>
	<div>
		<div class="follow">
			<button @click="followAndUnFloow">
				<p>{{following}}</p>
			</button>
		</div>
	</div>
</template>

<script>
	import '../assets/css/follow.css'
	import { db } from '../firebase.js';
	import { follow, template, notifications, username } from '../mixins/mixin.js';
	
	export default {
		name: 'Fallow',

		props: ['authID','userID'],

		mixins: [follow, template, notifications, username],

		mounted () {
			this.follow(this.userID, this.authID);
			this.notificationsRawData(this.userID);
		},

		data () {
			return {
				following: 'Follow',
			}
		},


		methods: {

			followAndUnFloow () {

				let userID = this.userID;
				let authID = this.authID;
				let template = this.template;
				template.type = 'Follow';


				if(!this.isFollow){
					db.ref(`follow/${authID}/followed`).push(userID);
					db.ref(`follow/${userID}/follower`).push(authID);
					if(this.didItSendFollow == false){
						db.ref(`notifications/${userID}`).push(template);
					};
	
				}else {
					db.ref(`follow/${userID}/follower/${this.followerKey}`).remove();
					db.ref(`follow/${authID}/followed/${this.followedKey}`).remove();

				}
			},

		},

		computed: {

			isFollow () {
				return this.followed.includes(this.authID)
			},

		},

		watch: {
			isFollow ( value ) {
				value ? this.following = 'Following': this.following = 'Follow';
			},
		}
   }
</script>