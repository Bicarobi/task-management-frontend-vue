<template>
	<NavBar />
	<PopupModal v-show="this.showPopup" :messages="this.messages" @click="this.showPopup = false" />
	<router-view @show-popup="this.showPopupModal" />
</template>

<script>
import NavBar from "./components/NavBar.vue";
import PopupModal from "./components/PopupModal.vue";

export default {
	name: "App",
	components: { NavBar, PopupModal },
	data() {
		return {
			messages: "",
			showPopup: false,
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
	},
};
</script>

<style></style>
