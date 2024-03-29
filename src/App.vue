<template>
	<NavBar />
	<router-view />
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
	name: "App",
	components: { NavBar },
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
