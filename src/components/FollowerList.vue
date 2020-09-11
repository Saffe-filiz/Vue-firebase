<template>
	<div v-if="">
		<div class="follower-list">
			<p>Follower {{ numberOfFollowed }}</p>
			<p>Follow {{ numberOfFollower }}</p>
		</div>
	</div>
</template>
<script>

	import '../assets/css/follower-list.css';
	import { follow } from '../mixins/mixin.js';

	export default {
		name: 'FollowerList',

		props: ['userID','authID'],

		mixins: [follow],

		data () {
			return {
				numberOfFollowed: 0,
				numberOfFollower: 0,
			}
		},

		created () {
			this.follow(this.userID, this.authID)
		},

		watch: {
			followed (value) {
				this.numberOfFollowed = Object.keys(value).length
			},

			follower (value) {
				this.numberOfFollower = Object.keys(value).length
			}
		},
	}
</script>