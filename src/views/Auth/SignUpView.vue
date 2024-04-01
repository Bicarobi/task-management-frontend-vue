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
			/* var term = "sample1";
			var re = new RegExp("^([a-z0-9]{5,})$");
			if (re.test(term)) {
				console.log("Valid");
			} else {
				console.log("Invalid");
			} */

			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username: this.username, password: this.password }),
			};

			await fetch(process.env.VUE_APP_BASE_URL + "/auth/signup", requestOptions)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					var messages;

					if (!typeof data.message === "array") {
						messages = data.message;
					} else {
						messages = Object.values(data.message);
					}
					console.log(messages);

					if (data.statusCode == 201) {
						console.log(data);
						this.$emit("show-popup", messages);

						this.$router.push({ name: "signIn" });
					} else {
						console.log(data);
						this.$emit("show-popup", messages);
					}
				});
		},
	},
};
</script>

<style></style>
