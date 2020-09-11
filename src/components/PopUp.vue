<template>
	<div class="popup-content">
		<img :src="require(`../assets/img/${icon}`)">
		<div class="PopUp-msg">
			<p>{{msg}}</p>
		</div>
	</div>
</template>

<script>
	import '../assets/css/PopUp.css';
	
	export default {
		name: 'popup',

		props: ['forgetPassword', 'login'],

		data () {
			return {
				updatesUsername: '',
				updateEmail: '',
				upDatePassword: '',
			}
		},

		created () {
			this.icon;
		},

		methods: {
			chanceUsername () {
				return db.ref(`users/${firebase.auth().currentUser.uid}`)
			 },
		},

		computed: {
			icon () {
				return this.forgetPassword == 'Transaction successful.' 
				|| this.login == '' ? 'success.png' : 'error.png';
			},

			msg () {
				return this.forgetPassword || this.login
			}
		}
	}
</script>