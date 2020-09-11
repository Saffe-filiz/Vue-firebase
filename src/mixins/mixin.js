import firebase from 'firebase'; 
import { db } from '../firebase.js';

export const authID = {

	data () {
		return {
			authIDS: null
		}
	},

	computed : {

		authID () {
		    let auth = firebase.auth().currentUser;
		    return auth == null ? null: auth.uid;
	    }
	}, 	
}

export const follow = {

	data () {
		return {
			follower: [],
			followed: [],
			followedData: null,
			followerData: null,
			followerKey: '',
			followedKey: '',
		}
	},

	methods: {

		follow (userID, authID) {
			    let currentUser = db.ref(`follow/${userID}`);
			    let user = db.ref(`follow/${authID}`);

			    user.on('value', snapshot => {
			    	let data = snapshot.val() || {};
			    	this.followedData = data.followed || {};
			});

			    currentUser.on('value', snapshot => {
			        let data = snapshot.val() || {};
			        this.followerData = data.follower || {};

			        this.follower = Object.values(data.followed || {});
			        this.followed = Object.values(data.follower || {});
			});
		}
	},

	watch: {
			followedData (value) {
				this.followedKey = Object.keys(value).filter(v => value[v] == this.userID)[0];
			},

			followerData (value) {
				this.followerKey = Object.keys(value).filter( v => value[v] == this.authID)[0];
			}
		},
};

export const username = {

	computed: {

		username () {

			let authID = this.authID;
			let data;

				db.ref(`users/${authID}`).on('value', snapshot =>  {
				data = snapshot.val();
				this.detail = true;
			});	
			   return data.username;
		},
	},
};

export const template = {

	computed: {

		template () {

				let template = {
					username: this.username,
					userID: this.authID,
					date: `${new Date()}`,
					postID: db.ref().push().key,
					viewed: false,
					type: 'Comment',
				};

				return template
			},
	}
}

export const notifications = {

	data () {
		return {
			notificationsData: null,
			didItSendFollow: null,
			didItSendLike: null,
		}
	},

	methods: {
		notificationsRawData (userID) {
		return	db.ref(`notifications/${userID}`).on('value', snapshot => {	
					let data = snapshot.val() || {};
					this.notificationsData = data;
					        
			});
		}
	},

	watch: {

		notificationsData (value) {
			let self = value;
			let resultFollow = false;
			let resultLike = false;
			Object.values(self).forEach( v => {
				if(v.type == 'Follow' && v.userID == this.authID){
					return resultFollow = true;
				}else {(v.type == 'Like' && v.postID == this.postID)
				   return resultLike = true
				}
			});
			this.didItSendFollow = resultFollow;
			this.didItSendLike = resultLike;
		},
	},
}


