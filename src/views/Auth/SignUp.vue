<template>
	<form @submit.prevent="handleSubmit" v-on:keydown.enter.prevent>
		<label>Username:</label>
		<input type="text" required v-model="username" />

		<label>Password:</label>
		<input type="password" required v-model="password" />

		<div class="submit">
			<button>Create an Account</button>
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

			fetch("http://localhost:3000/auth/signup", requestOptions).then((res) => console.log(res.json()));
		},
	},
};
</script>

<style></style>
