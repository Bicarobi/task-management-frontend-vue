<template>
	<div class="navbar-container">
		<div class="grid-container">
			<div class="grid-left-side">
				<div class="site-name">Tasker</div>
			</div>
			<div class="grid-right-side">
				<router-link to="/">Home</router-link>
				<router-link :to="{ name: 'about' }">About</router-link>

				<router-link :to="{ name: 'tasks' }" v-if="this.$myGlobalVariable.username">Tasks</router-link>
				<!-- <router-link :to="{ name: 'createTask' }">Create a Task</router-link>
					<router-link :to="{ name: 'deleteTask' }">Delete a Task</router-link> -->

				<router-link class="username" :to="{ name: 'profile', params: { username: this.$myGlobalVariable.username } }" v-if="this.$myGlobalVariable.username">{{
					this.$myGlobalVariable.username
				}}</router-link>

				<!-- <SettingsIcon @click="openSettings(false, false)" v-if="this.$myGlobalVariable.username" />

				<SettingsMenu v-if="this.$myGlobalVariable.username && this.settingsMenuOpened" @close-menu="openSettings(true, false)" /> -->
				<button @click="logOut" v-if="this.$myGlobalVariable.username">Sign Out</button>

				<router-link :to="{ name: 'signIn' }" v-if="!this.$myGlobalVariable.username">Sign In</router-link>
				<router-link :to="{ name: 'signUp' }" v-if="!this.$myGlobalVariable.username">Sign Up</router-link>

				<ThemeIcon :switchedTheme="this.switchedTheme" @click="switchTheme" />
			</div>
		</div>
	</div>
</template>

<script>
import ThemeIcon from "../components/icons/ThemeIcon.vue";
import SettingsIcon from "../components/icons/SettingsIcon.vue";

import SettingsMenu from "../components/SettingsMenu.vue";

export default {
	name: "NavBar",
	components: {
		SettingsIcon,
		ThemeIcon,
		SettingsMenu,
	},
	data() {
		return {
			switchedTheme: false,
			settingsMenuOpened: false,
		};
	},
	methods: {
		checkStorage() {
			this.$myGlobalVariable.username = localStorage.username;
			this.$myGlobalVariable.accessToken = localStorage.accessToken;

			if (localStorage.darkMode == "enabled") {
				this.switchedTheme = true;
			} else {
				this.switchedTheme = false;
			}

			this.switchTheme();
		},
		openSettings(useVal, openMenu) {
			if (useVal) {
				this.settingsMenuOpened = openMenu;
			} else {
				this.settingsMenuOpened = !this.settingsMenuOpened;
			}
		},
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

			this.$router.push({ name: "signIn" });
		},
	},
	beforeMount() {
		this.checkStorage();
	},
};
</script>

<style></style>
