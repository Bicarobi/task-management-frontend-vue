<template>
	<NavBar @log-out="this.logOut" />
	<PopupModal v-show="this.showPopup" :messages="this.messages" @click="this.showPopup = false" />
	<LoadingModal v-show="this.showLoading" />
	<router-view @show-popup="this.showPopupModal" @show-loading="this.showLoadingModal" @log-out="this.logOut" />
</template>

<script>
import NavBar from "./components/NavBar.vue";
import PopupModal from "./components/PopupModal.vue";
import LoadingModal from "./components/LoadingModal.vue";

export default {
	name: "App",
	components: { NavBar, PopupModal, LoadingModal },
	data() {
		return {
			messages: "",
			showPopup: false,
			showLoading: false,
			timer: 0,
		};
	},
	mounted() {
		this.$myGlobalVariable.windowWidth = window.innerWidth;

		window.onresize = () => {
			this.$myGlobalVariable.windowWidth = window.innerWidth;
		};
	},
	methods: {
		showPopupModal(messages) {
			this.messages = messages;
			this.showPopup = true;

			if (this.timer >= 0) {
				clearTimeout(this.timer);
			}

			this.timer = setTimeout(() => {
				this.showPopup = false;
			}, 5000);
		},
		showLoadingModal(show) {
			this.showLoading = show;
		},
		logOut() {
			this.$myGlobalVariable.username = "";
			this.$myGlobalVariable.accessToken = "";
			this.$myGlobalVariable.profileImage = "";
			localStorage.accessToken = "";
			localStorage.username = "";
			localStorage.profileImage = "";

			this.$router.push({ name: "signIn" });
		},
	},
};
</script>

<style></style>
