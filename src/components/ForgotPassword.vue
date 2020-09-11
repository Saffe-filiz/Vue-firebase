<template>
	<div>
		<transition name="fade" appear>
			<div class="popop-background" v-show="popUp" @click="popUp = !popUp">
				<PopUp :forgetPassword="message"/>
			</div>
		</transition>
		<div class="forgot_password-form">
			<img src="../assets/img/send-email.png">
			<div class="forgot_password-emil">
				<form>
					<input type="text"  required v-model="email">
					<label>Email</label>
				</form>
				<button  @click="resetPassword()">Reset Password</button>
			</div>
		</div>
	</div>
</template>

<script>
	import '../assets/css/forgot_password.css';
	import firebase from 'firebase'; 
	import PopUp from './PopUp.vue'
	import { bus } from '../main.js';
	
	export default {
		name: 'Forgot-Password',

		data () {
			return {
				email: '',
				message: 'Please enter email address.',
				popUp: false,
			}
		},

		components: {
			PopUp,
		},

		methods: {
			resetPassword () {
				firebase.auth().sendPasswordResetEmail(this.email)
				.then(() => {
					this.message = 'Transaction successful.';
					this.popUp = true;
					setTimeout(() => { 
						bus.$emit('chance', false); 
						this.email = '';
						this.popUp = false ;
					},2000);
				})
				.catch(err => {
					this.message = err.message;
					this.popUp = true;
					setTimeout(() => { 
						this.popUp = false 
					},3000);
					this.email = '';
				})
			},

		},
	}

</script>