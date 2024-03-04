<template>
	<form @submit.prevent="handleSubmit" v-on:keydown.enter.prevent>
		<label>Username:</label>
		<input type="text" required v-model="username" />

		<label>Password:</label>
		<input type="password" required v-model="password" />

		<div class="submit">
			<button>Sign In</button>
		</div>
	</form>
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
			fetch("http://localhost:3000/auth/signin", requestOptions)
				.then((res) => res.json())
				.then((data) => {
					app.config.globalProperties.$accessToken = data.accessToken;
					app.config.globalProperties.$username = this.username;
					/* provide("localstorage"); */
					/* this.$localStorage.accessToken = data.accessToken;
					this.$localStorage.username = this.username; */
					/* localStorage.accessToken = data.accessToken;
					localStorage.name = this.username; */
				})
				.then(console.log(this.$accessToken, this.$username));
		},
	},
};
</script>

<style></style>
