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
				<div class="username" v-if="this.$myGlobalVariable.username">
					{{ this.$myGlobalVariable.username }}
				</div>
				<SettingsIcon @click="openSettings(false, false)" v-if="this.$myGlobalVariable.username" />

				<SettingsMenu v-if="this.$myGlobalVariable.username && this.settingsMenuOpened" @close-menu="openSettings(true, false)" />

				<router-link :to="{ name: 'signIn' }" v-if="!this.$myGlobalVariable.username">Sign In</router-link>
				<router-link :to="{ name: 'signUp' }" v-if="!this.$myGlobalVariable.username">Sign Up</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import SettingsIcon from "../components/icons/SettingsIcon.vue";
import SettingsMenu from "../components/SettingsMenu.vue";

export default {
	name: "NavBar",
	components: {
		SettingsIcon,
		SettingsMenu,
	},
	data() {
		return {
			settingsMenuOpened: false,
		};
	},
	methods: {
		checkStorage() {
			this.$myGlobalVariable.username = localStorage.username;
			this.$myGlobalVariable.accessToken = localStorage.accessToken;
		},
		openSettings(useVal, openMenu) {
			if (useVal) {
				this.settingsMenuOpened = openMenu;
			} else {
				this.settingsMenuOpened = !this.settingsMenuOpened;
			}
		},
	},
	beforeMount() {
		this.checkStorage();
	},
};
</script>

<style></style>
