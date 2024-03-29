<template>
	<div class="settings-menu-container">
		<ThemeIcon :switchedTheme="this.switchedTheme" @click="switchTheme" />
		<button @click="logOut" v-if="this.$myGlobalVariable.username">Sign Out</button>
	</div>
</template>

<script>
import ThemeIcon from "../components/icons/ThemeIcon.vue";

export default {
	name: "SettingsMenu",
	props: ["settingsMenuOpened"],
	components: {
		ThemeIcon,
	},
	data() {
		return {
			switchedTheme: false,
			themeIcon: "moon",
		};
	},
	methods: {
		switchTheme() {
			if (this.switchedTheme) {
				document.documentElement.setAttribute("data-theme", "dark");
				localStorage.darkMode = "enabled";
			} else {
				document.documentElement.setAttribute("data-theme", "light");
				localStorage.darkMode = "disabled";
			}
			this.switchedTheme = !this.switchedTheme;
		},
		logOut() {
			this.$emit("close-menu");

			this.$myGlobalVariable.username = "";
			this.$myGlobalVariable.accessToken = "";
			localStorage.accessToken = "";
			localStorage.username = "";
		},
	},
	beforeMount() {
		if (localStorage.darkMode == "enabled") {
			this.switchedTheme = true;
			this.switchTheme();
		} else {
			this.switchedTheme = false;
			this.switchTheme();
		}
	},
};
</script>

<style></style>
