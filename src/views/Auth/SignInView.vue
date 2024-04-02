<template>
	<div class="sign-in-container">
		<div class="modal-content" v-if="!this.$myGlobalVariable.username">
			<form @submit.prevent="handleSubmit" v-on:keydown.enter.prevent>
				<label>{{ $t("user-auth.username") }}:</label>
				<input type="text" required v-model="username" />

				<label>{{ $t("user-auth.password") }}:</label>
				<input type="password" required v-model="password" />

				<div class="error-text" v-show="this.showUsernameError">{{ $t("popup.invalid-credentials") }}</div>

				<div class="submit">
					<button>{{ $t("user-auth.sign-in") }}</button>
				</div>
				<div class="switch-text">
					{{ $t("sign-in-view.switch-text") }}
					<router-link :to="{ name: 'signUp' }">{{ $t("user-auth.sign-up") }}!</router-link>
				</div>
			</form>
		</div>
		<div v-else>{{ $t("user-auth.logged-in") }}!</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: "",
			password: "",
			showUsernameError: false,
		};
	},
	methods: {
		async handleSubmit() {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username: this.username, password: this.password }),
			};

			await fetch(process.env.VUE_APP_BASE_URL + "/auth/signin", requestOptions)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.accessToken) {
						var messages = ["logged-in"];
						this.$emit("show-popup", messages);

						this.$myGlobalVariable.accessToken = data.accessToken;
						this.$myGlobalVariable.username = this.username;
						localStorage.accessToken = this.$myGlobalVariable.accessToken;
						localStorage.username = this.$myGlobalVariable.username;
						setTimeout(() => this.$emit("log-out"), 3600000);

						this.getProfileImage();

						this.$router.push({ name: "tasks" });
					} else {
						var messages = ["invalid-credentials"];
						this.$emit("show-popup", messages);
					}
				});
		},
		async getProfileImage() {
			if (this.$myGlobalVariable.accessToken) {
				await fetch(process.env.VUE_APP_BASE_URL + "/files", { headers: { Authorization: "Bearer " + this.$myGlobalVariable.accessToken } })
					.then((res) => res.text())
					.then((data) => {
						this.$myGlobalVariable.profileImage = data;
						localStorage.profileImage = this.$myGlobalVariable.profileImage;
					});
			}
		},
		type(obj) {
			return Object.prototype.toString.call(obj).slice(8, -1);
		},
	},
};
</script>

<style></style>
