<template>
	<div class="sign-in-container">
		<div class="current-page">{{ $t("sign-in-view.current-page") }}</div>
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
		/* async handleSubmit() {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username: this.username, password: this.password }),
			};

			await fetch(process.env.VUE_APP_BASE_URL + "/auth/signin", requestOptions)
				.then((res) => res.json())
				.then((data) => {
					this.$myGlobalVariable.accessToken = data.accessToken;
					this.$myGlobalVariable.username = this.username;
					localStorage.accessToken = this.$myGlobalVariable.accessToken;
					localStorage.username = this.$myGlobalVariable.username;
					setTimeout(this.logOut, 3600000);
				})
				.then(console.log(this.$myGlobalVariable.username));

			this.$router.push({ name: "tasks" });
		}, */
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
						setTimeout(this.logOut, 3600000);
						this.$router.push({ name: "tasks" });
					} else {
						var messages = ["invalid-credentials"];
						this.$emit("show-popup", messages);
					}
				});
		},
		logOut() {
			this.$myGlobalVariable.username = "";
			this.$myGlobalVariable.accessToken = "";
			localStorage.accessToken = "";
			localStorage.username = "";

			this.$router.push({ name: "signIn" });
		},
		type(obj) {
			return Object.prototype.toString.call(obj).slice(8, -1);
		},
	},
};
</script>

<style></style>
