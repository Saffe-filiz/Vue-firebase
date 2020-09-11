<template>
	<div>
		<div class="login-form">
			<transition name="fade" appear>
				<div class="popop-background" v-show="popUp" @click="popUp = !popUp">
					<PopUp :login="message"/>
				</div>
			</transition>
			<ForgotPassword v-show="Forgot_Password"></ForgotPassword>
			<div class="content-login-page" v-show="!Forgot_Password">
				<h2>Login</h2>
				<div class="input-email">
					<input type="text" v-model="email" required>
					<label>Email</label>
				</div>
				<div class="input-password">
					<input :type="chanceType ? 'text': 'password' " v-model="password" required>
					<button @click="chanceType = !chanceType">
						<img :src="require(`../assets/img/${icon}`)"width="25">
					</button>
					<label>Password</label>
				</div>
				<button @click="singIn()">Login</button>
				<div class="router-link">
					<router-link to="/register">Sing Up</router-link><p>|</p>
					<router-link @click.native="Forgot_Password = true" to="">Forgot Password
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import '../assets/css/login.css';
	import ForgotPassword from './ForgotPassword.vue'
	import PopUp from './PopUp.vue'
	import firebase from 'firebase';    
	import { bus } from '../main.js';

	export default {
		name: 'login',

		data () {
			return {
				email: '',
				password: '',
				Forgot_Password: false,
				chanceType: false,
				popUp: false,
				message: '',
			}
		},

		components: {
			ForgotPassword,
			PopUp,
		},

		created () {
			bus.$on('chance', (data) => {this.Forgot_Password = data})
		},


		methods: {
			singIn () {
				firebase.auth().signInWithEmailAndPassword(this.email, this.password)
				.then( (user) => {
					this.$router.replace({name: 'Home'});
					this.popUp = false;
				})
				.catch( error => {
					this.message = error.message;
					this.popUp = true;
				})
			}

		},

		computed: {
			icon () {
				return this.chanceType == false ? 'eye-visibilty.png': 'eye-hidden.png';
			},

			errorMsg () {
				return this.email == '' && this.password !== '' ? 
				this.message = 'Please enter email address.': 
				this.password == '' && this.email !== '' ? this.message = 'Please enter password address.': 
				this.email == '' && this.password == '' ? 'Please fill in the required fields.':
				this.message;
			}

		},
	}

</script>

