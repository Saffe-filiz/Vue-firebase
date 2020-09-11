import Home from '../components/Home.vue';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import User from '../components/User.vue';

export default {
	routes: [
	    {path: '/', name: 'Home', component: Home},
        {path: '/login', name: 'Login', component: Login, meta: { requiresAuth: true }},
	    {path: '/register', name: 'Register', component: Register, meta: { requiresAuth: true }},
        {path: '/:username', name: 'User Page', component: User},
	],
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
		return { y: 0,  x: 0 }
	}
}
