<template>
	<div v-if="!this.$myGlobalVariable.username">
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
		handleSubmit() {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username: this.username, password: this.password }),
			};
			fetch(process.env.VUE_APP_BASE_URL + "/auth/signin", requestOptions)
				.then((res) => res.json())
				.then((data) => {
					this.$myGlobalVariable.accessToken = data.accessToken;
					this.$myGlobalVariable.username = this.username;
				})
				.then(console.log(this.$myGlobalVariable.accessToken, this.$myGlobalVariable.username));
		},
	},
};
</script>

<style></style>
