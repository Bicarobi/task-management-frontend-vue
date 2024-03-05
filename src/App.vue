<template>
	<nav>
		<router-link to="/">Home</router-link>
		<router-link :to="{ name: 'about' }">About</router-link> |
		<router-link :to="{ name: 'signIn' }" v-if="!this.$myGlobalVariable.username">Sign In</router-link>
		<router-link :to="{ name: 'signUp' }" v-if="!this.$myGlobalVariable.username">Sign Up</router-link>
		<router-link :to="{ name: 'tasks' }" v-if="this.$myGlobalVariable.username">Tasks</router-link>
		<router-link :to="{ name: 'createTask' }" v-if="this.$myGlobalVariable.username">Create a Task</router-link>
		<router-link :to="{ name: 'deleteTask' }" v-if="this.$myGlobalVariable.username">Delete a Task</router-link>
		<div>{{ this.$myGlobalVariable.username }}</div>
		<button v-if="this.$myGlobalVariable.username" @click="logOut">Sign Out</button>
	</nav>
	<router-view />
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		logOut() {
			this.$myGlobalVariable.username = "";
			this.$myGlobalVariable.accessToken = "";
		},
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
