<template>
	<div class="sign-up-container">
		<div class="modal-content">
			<form @submit.prevent="handleSubmit" v-on:keydown.enter.prevent>
				<label>{{ $t("user-auth.username") }}:</label>
				<input type="text" required v-model="username" />

				<label>{{ $t("user-auth.password") }}:</label>
				<input type="password" required v-model="password" />

				<div class="submit">
					<button>{{ $t("user-auth.create-account") }}</button>
				</div>
			</form>
		</div>
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

			await fetch(process.env.VUE_APP_BASE_URL + "/auth/signup", requestOptions);

			this.$router.push({ name: "signIn" });
		},
	},
};
</script>

<style></style>
