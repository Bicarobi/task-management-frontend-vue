<template>
	<div class="sign-in-container">
		<div class="modal-content" v-if="!this.$myGlobalVariable.username">
			<form @submit.prevent="handleSubmit" v-on:keydown.enter.prevent>
				<label>Username:</label>
				<input type="text" required v-model="username" />

				<label>Password:</label>
				<input type="password" required v-model="password" />

				<div class="submit">
					<button>Sign In</button>
				</div>
			</form>
		</div>
		<div v-else>Already logged in!</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: "",
			password: "",
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
					this.$myGlobalVariable.accessToken = data.accessToken;
					this.$myGlobalVariable.username = this.username;
					localStorage.accessToken = this.$myGlobalVariable.accessToken;
					localStorage.username = this.$myGlobalVariable.username;
					setTimeout(this.logOut, 3600000);
				})
				.then(console.log(this.$myGlobalVariable.username));

			this.$router.push({ name: "tasks" });
		},
		logOut() {
			this.$myGlobalVariable.username = "";
			this.$myGlobalVariable.accessToken = "";
			localStorage.accessToken = "";
			localStorage.username = "";

			this.$router.push({ name: "signIn" });
		},
	},
};
</script>

<style></style>
