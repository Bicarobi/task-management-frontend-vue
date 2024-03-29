<template>
	<div class="settings-menu-container">
		<button @click="logOut" v-if="this.$myGlobalVariable.username">Sign Out</button>
	</div>
</template>

<script>
export default {
	name: "SettingsMenu",
	props: ["settingsMenuOpened"],
	methods: {
		logOut() {
			this.$emit("close-menu");

			this.$myGlobalVariable.username = "";
			this.$myGlobalVariable.accessToken = "";
			localStorage.accessToken = "";
			localStorage.username = "";
		},
	},
};
</script>

<style></style>
