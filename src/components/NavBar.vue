<template>
	<div class="navbar-container">
		<div class="grid-container">
			<div class="grid-left-side">
				<!-- <div class="site-name">Tasker</div> -->
				<router-link :to="{ name: this.$myGlobalVariable.username ? 'tasks' : 'home' }">Tasker</router-link>
			</div>
			<div class="grid-right-side">
				<div class="nav-bar-menu">
					<MenuIcon
						:style="{ display: this.$myGlobalVariable.windowWidth < this.$myGlobalVariable.tabletWindowWidth ? 'block' : 'none' }"
						@click="openNavbarMenu(false, false)"
						:navbarMenuOpened="this.navbarMenuOpened"
					/>
					<div class="nav-bar-menu-content" v-show="this.$myGlobalVariable.windowWidth > this.$myGlobalVariable.tabletWindowWidth || this.navbarMenuOpened">
						<router-link to="/" @click="openNavbarMenu(false, false)">{{ $t("home-view.current-page") }}</router-link>

						<!-- <router-link :to="{ name: 'about' }" @click="openNavbarMenu(false, false)">About</router-link> -->

						<router-link :to="{ name: 'tasks' }" v-if="this.$myGlobalVariable.username" @click="openNavbarMenu(false, false)">{{ $t("tasks.current-page") }}</router-link>
						<!-- <router-link :to="{ name: 'createTask' }">Create a Task</router-link>
					<router-link :to="{ name: 'deleteTask' }">Delete a Task</router-link> -->

						<router-link :to="{ name: 'profile', params: { username: this.$myGlobalVariable.username } }" v-if="this.$myGlobalVariable.username" @click="openNavbarMenu(false, false)">
							<div class="profile-image-router">
								{{ this.$myGlobalVariable.username }}
								<img class="profile-image" :src="this.$myGlobalVariable.profileImage ? this.$myGlobalVariable.profileImage : require('../assets/placeholder.png')" /></div
						></router-link>

						<!-- <router-link
							class="username"
							:to="{ name: 'profile', params: { username: this.$myGlobalVariable.username } }"
							v-if="this.$myGlobalVariable.username"
							@click="openNavbarMenu(false, false)"
							>{{ this.$myGlobalVariable.username }}</router-link
						> -->

						<!-- <SettingsIcon @click="openSettings(false, false)" v-if="this.$myGlobalVariable.username" />

				<SettingsMenu v-if="this.$myGlobalVariable.username && this.settingsMenuOpened" @close-menu="openSettings(true, false)" /> -->
						<!-- <button @click="this.$emit('log-out')" v-if="this.$myGlobalVariable.username">{{ $t("user-auth.sign-out") }}</button> -->

						<router-link :to="{ name: 'signIn' }" v-if="!this.$myGlobalVariable.username" @click="openNavbarMenu(false, false)">{{ $t("user-auth.sign-in") }}</router-link>

						<router-link :to="{ name: 'signUp' }" v-if="!this.$myGlobalVariable.username" @click="openNavbarMenu(false, false)">{{ $t("user-auth.sign-up") }}</router-link>

						<div class="locale-changer">
							<select v-model="$i18n.locale">
								<option selected value="hr">Hrvatski</option>
								<option value="en">English</option>
							</select>
						</div>
						<ThemeIcon :switchedTheme="this.switchedTheme" @click="switchTheme" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ThemeIcon from "../components/icons/ThemeIcon.vue";
import SettingsIcon from "../components/icons/SettingsIcon.vue";
import MenuIcon from "../components/icons/MenuIcon.vue";

import SettingsMenu from "../components/SettingsMenu.vue";

export default {
	name: "NavBar",
	components: {
		SettingsIcon,
		ThemeIcon,
		MenuIcon,
		SettingsMenu,
	},
	data() {
		return {
			switchedTheme: false,
			settingsMenuOpened: false,
			navbarMenuOpened: false,
		};
	},
	methods: {
		checkStorage() {
			this.$myGlobalVariable.username = localStorage.username;
			this.$myGlobalVariable.accessToken = localStorage.accessToken;
			this.$myGlobalVariable.profileImage = localStorage.profileImage;

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
		openNavbarMenu(useVal, openMenu) {
			if (useVal) {
				this.navbarMenuOpened = openMenu;
			} else {
				this.navbarMenuOpened = !this.navbarMenuOpened;
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
	},
	beforeMount() {
		this.checkStorage();
	},
};
</script>

<style></style>
