<template>
	<nav>
		<router-link to="/">Home</router-link> |
		<router-link :to="{ name: 'about' }">About</router-link>
		<router-link :to="{ name: 'signIn' }">Sign In</router-link>
		<router-link :to="{ name: 'signUp' }">Sign Up</router-link>
		<router-link :to="{ name: 'tasks' }">Tasks</router-link>
		<div>{{ this.$accessToken }}</div>
	</nav>
	<router-view />
</template>

<script>
export default {
	data() {
		return {
			isLoggedIn: false,
			username: null,
		};
	},
	computed: {
		isLoggedIn() {
			return this.$localStorage.token !== "";
		},
	},
	methods: {
		logIn() {
			this.username = localStorage.name;
		},
	},
	mounted() {
		if (localStorage.name) {
			this.name = localStorage.name;
		}
		window.addEventListener("storage", updateLocalStorage);
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
	text-decoration: none;
	padding: 10px;
	border-radius: 4px;
}

nav a.router-link-exact-active {
	color: white;
	background-color: crimson;
}

button {
	margin: 0 10px;
	padding: 10px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}
</style>
