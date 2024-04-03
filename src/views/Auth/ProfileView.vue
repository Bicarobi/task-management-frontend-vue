<template>
	<div class="profile-container">
		<div class="profile">
			<img
				class="profile-image"
				:src="this.$myGlobalVariable.profileImage ? this.$myGlobalVariable.profileImage : require('../../assets/placeholder.png')"
				v-if="this.$myGlobalVariable.username"
			/>

			<form @submit.prevent="handleSubmit">
				<label for="imageInput" class="custom-file-upload"><UploadIcon /> {{ $t("profile-view.upload") }} </label>
				<input type="file" id="imageInput" accept="image/*" @change="handleSubmit" />
			</form>
			<div class="error-text" v-show="this.showFileError">{{ $t("profile-view.file-error") }}</div>
			<div class="username-container">
				{{ $t("user-auth.username") }}:
				<span class="username">{{ this.$myGlobalVariable.username }}</span>
			</div>

			<button @click="this.$emit('log-out')" v-if="this.$myGlobalVariable.username">{{ $t("user-auth.sign-out") }}</button>
		</div>
	</div>
</template>

<script>
import UploadIcon from "../../components/icons/UploadIcon.vue";

export default {
	name: "ProfileView",
	components: { UploadIcon },
	data() {
		return {
			showFileError: false,
		};
	},
	methods: {
		async handleSubmit() {
			var input = document.getElementById("imageInput");

			if (input.files && input.files[0]) {
				var file = input.files[0];
				const fileSize = file.size;
				const fileMb = fileSize / 1024 ** 2;

				if (fileMb <= 3) {
					this.showFileError = false;

					var formData = new FormData();
					formData.append("image", file);

					const requestOptions = {
						method: "POST",
						headers: { Authorization: "Bearer " + this.$myGlobalVariable.accessToken },
						body: formData,
					};

					this.$emit("show-loading", true);

					await fetch(process.env.VUE_APP_BASE_URL + "/files", requestOptions)
						.then((res) => res.text())
						.then((data) => {
							this.$myGlobalVariable.profileImage = data;
							localStorage.profileImage = this.$myGlobalVariable.profileImage;
							console.log(this.$myGlobalVariable.profileImage);
						});

					this.$emit("close-create-task-modal");
					this.$emit("show-loading", false);
				} else {
					this.showFileError = true;
				}
			}
		},
	},
};
</script>
