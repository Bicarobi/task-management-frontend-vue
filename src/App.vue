<template>
	<NavBar />
	<router-view />
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
	name: "App",
	components: { NavBar },
	mounted() {
		this.$myGlobalVariable.windowWidth = window.innerWidth;

		window.onresize = () => {
			this.$myGlobalVariable.windowWidth = window.innerWidth;
		};
	},
};
</script>

<style></style>
