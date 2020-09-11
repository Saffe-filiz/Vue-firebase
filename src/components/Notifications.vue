<template>
	<div class="notification-list" v-if="detail">
			<div class="notification-cart" v-for="(user, index) in notificationsData">
			<span class="notification-cart-viewed" @click="viewed(keyData[index])">
				<p>{{user.type}}</p>
				<p id="notification-date">{{user.date | date}} </p>
				<h4>{{user.username}}</h4>
				<img v-if="!user.viewed" src="../assets/img/new.png" width="30">
			</span>
		</div>
    </div>
</template>

<script>
	import '../assets/css/notifications.css';
	import { db } from '../firebase.js';
	
	export default {
		name: 'Notifications',

		data () {
			return {
				notificationsData: [],
				keyData: [],
				detail: false,
			}
		},

		props: ['authID'],

		mounted() {
			this.notificationsRawData;
		},

		methods: {

			viewed (id) {
				let authID = this.authID
				let notificationsLink = db.ref(`notifications/${authID}/${id}`);
				notificationsLink.update({viewed: true})
			},
		},

		computed: {
			notificationsRawData () {
				let authID = this.authID;
				let notificationsLink = db.ref(`notifications/${authID}`);
				
				notificationsLink.on('value', snapshot => {	
					let data = snapshot.val() || {};
					let value = Object.values(data).filter( v => v.userID !== authID).reverse();
					let id = Object.keys(data).filter( v => data[v].userID !== authID).reverse()
					this.notificationsData = value;
					this.keyData = id;
					this.detail = true;
				});
			},
		}
	}
</script>