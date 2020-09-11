<template>
	<div>
		<loading v-if=""></loading>
		<div class="register" v-if="">
			<h2>Register</h2>
			<div class="register-username">
				<input type="text" v-model="username" required>
				<label>Username</label>
				<p :style="{ color: availableUsername }">{{chechUsername}}</p>
			</div>
			<div class="register-email">
				<input  type="text" v-model="email" required>
				<label>Email</label>
				<p :style="{ color:availableEmail }">{{chechEmail}}</p>
			</div>
			<div class="register-password">
				<input :type="chanceType ? 'text': 'password' " v-model="password" required>
				<button @click="chanceType = !chanceType">
					<img :src="require(`../assets/img/${icon}`)"width="25">
				</button> 
				<label>Password</label>
				<p :style="{ color: passwordLevelColor }">{{chechPassword}}</p>
			</div>
		<div class="send-button">
			<button :disabled="!isDisabled" @click.prevent="singUp">Send</button>
		</div>
	</div>
</div>
</div>
</template>


<script>
	import '../assets/css/register.css'
	import firebase from 'firebase';    
	import { db } from '../firebase.js';
	import loading from './loading.vue'


	export default {
		name: 'Register',

		data () {
			return {
                username: '',
                about: '',
                email: '',
                password: '',
                allUsername: [],
                allEmail: [],
                detail: false,
                chanceType: false,
            }
		},

		components: {
			loading,
		},

		mounted () {
			this.takeAllEmailAndUsernames();
		},

		methods: {
		    singUp() {
		       return firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
		        .then(() => {
		        	    firebase.auth().onAuthStateChanged( user => {
		        	    	db.ref(`users/${user.uid}`).set({
		        	    		username: this.username,
                	            about: this.about,
                	            email: this.email,
                	            date: this.date,
                	            userID: user.uid,
		        	    	})
		        	    	
		        	    	db.ref(`username/`).push({username: this.username});
		        	    	db.ref('email/').push({email: this.email});
		        	    })

		        	 this.$router.push({path: `${this.username}`});
		        	 this.$router.go();
		        })
		        .catch(error => alert(error.message))
			},

		    takeAllEmailAndUsernames () {
				db.ref('email').once('value', snapshot => { 
				   let data = Object.values(snapshot.val());
				   data.forEach( v => this.allEmail.push(v.email))
				});
				db.ref('username').once('value', snapshot => { 
				   let data = Object.values(snapshot.val());
				   data.forEach( v => this.allUsername.push(v.username))
				})
				this.detail = true;
			},
		},

		computed: {

			date () {
				 return new Date().toLocaleString('en-GB', {year: 'numeric', month: 'long'})	
			},

			icon () {
				return this.chanceType == false ? 'eye-visibilty.png': 'eye-hidden.png';
			},

			chechUsername () {
				let username = this.username;
				let chech = this.allUsername.includes(username);
				return username.length > 1 && chech ? `@${username} has already been teken`:
				    username == '' ? '': username.length >= 15 || username.length < 3 ? 
				    'Username must be between 3 and 15 characters':
				    /[^\w\d\-\_]/g.test(username) == true ? 'Please try again without symbols':
				    `@${username} available`;
			},

			chechEmail () {
				let email = this.email;
				let chech = this.allEmail.includes(email);
				let is_it_email = /^(\S\@\w+\.\w{3}|.{1,}\S\@\w+\.\w{3})$/g.test(email);

				return is_it_email &&  chech ? 'This email has already been teken': 
				   is_it_email && chech == false ? 'This email available': 
				    is_it_email == false && email.length < 2 ? '': 
				    'The email address you entered is not valid'
			},

			chechPassword () {
				let weak = RegExp(/^(?=.*[a-z])|(?=.*\d).{6,}$/, 'g');
				let good = 
				RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$|(?=.*[a-z])(?=.*[A-Z]).{6,}$/, 'g');
				let strong = 
				RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!\-\.\_*()@%&]).{6,}$/, 'g');
				let password = this.password;
				return password.length >= 1 && password.length <= 5 ? 
				    'Password must be at least 6 characters': strong.test(password) ?
				    'Strong': good.test(password) ? 'Good': weak.test(password) ? 'Weak': '';	
			},

			passwordLevelColor () {
				let password = this.chechPassword.split(' ').slice(-1).join('')
				return password == 'Strong' ? '#1abc9c': password == 'Good' ? '#e67e22': '#c0392b'
			},

			availableUsername () {
				let username = this.chechUsername.split(' ').slice(-1);
				return  username == 'available' ? '#1abc9c': '#c0392b';
			},

			availableEmail () {
				let email = this.chechEmail.split(' ').slice(-1);
				return  email == 'available' ? '#1abc9c': '#c0392b';
			},

			isDisabled () {
				let is_true = '#1abc9c'
				return this.password.length >= 6 && this.availableUsername == is_true && 
				this.availableEmail == is_true 
			}

		},
	}

</script>