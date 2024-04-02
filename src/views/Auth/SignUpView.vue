<template>
	<div class="sign-up-container">
		<div class="current-page">{{ $t("sign-up-view.current-page") }}</div>
		<div class="modal-content">
			<form
				@submit.prevent="
					if (!this.showUsernameError && !this.showPasswordError) {
						this.handleSubmit();
					}
				"
				v-on:keydown.enter.prevent
			>
				<label>{{ $t("user-auth.username") }}:</label>
				<input type="text" required v-model="username" @input="checkUsername" />
				<div class="error-text" v-show="this.showUsernameError">{{ $t("popup.username-weak") }}</div>

				<label>{{ $t("user-auth.password") }}:</label>
				<input type="password" required v-model="password" @input="checkPassword" />
				<div class="error-text" v-show="this.showPasswordError">{{ $t("popup.password-weak") }}</div>

				<div class="submit">
					<button>{{ $t("user-auth.create-account") }}</button>
				</div>
				<div class="switch-text">
					{{ $t("sign-up-view.switch-text") }}
					<router-link :to="{ name: 'signIn' }">{{ $t("user-auth.sign-in") }}!</router-link>
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
			showPasswordError: false,
			showUsernameError: false,
		};
	},
	methods: {
		async handleSubmit() {
			this.checkUsername();
			this.checkPassword();

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

					console.log(data.message, this.type(data.message));

					if (this.type(data.message) == "String") {
						messages = [data.message];
					} else {
						messages = Object.values(data.message);
					}

					if (data.statusCode == 201) {
						this.$emit("show-popup", messages);

						this.$router.push({ name: "signIn" });
					} else {
						this.$emit("show-popup", messages);
					}
				});
		},
		checkUsername() {
			var re = new RegExp(/(?=^[^_]+_?[^_]+$)\w{3,20}$/);
			if (re.test(this.username)) {
				this.showUsernameError = false;
			} else {
				this.showUsernameError = true;
			}
		},
		checkPassword() {
			var re = new RegExp(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
			if (re.test(this.password)) {
				this.showPasswordError = false;
			} else {
				this.showPasswordError = true;
			}
		},
		type(obj) {
			return Object.prototype.toString.call(obj).slice(8, -1);
		},
	},
};
</script>

<style></style>
