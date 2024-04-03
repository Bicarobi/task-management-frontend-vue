<template>
	<div class="create-task-modal-container">
		<div class="modal-content" v-if="this.$myGlobalVariable.username">
			<form @submit.prevent="handleSubmit">
				<label>{{ $t("tasks.modal.title") }}:</label>
				<input type="text" required v-model="title" />

				<label>{{ $t("tasks.modal.description") }}:</label>
				<textarea
					type="text"
					onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
					onfocusout='this.style.height = "";'
					oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
					required
					v-model="description"
				></textarea>

				<label>{{ $t("tasks.modal.status") }}:</label>
				<select required v-model="status">
					<option value="OPEN">{{ $t("tasks.type.to-do") }}</option>
					<option value="IN_PROGRESS">{{ $t("tasks.type.in-progress") }}</option>
					<option value="DONE">{{ $t("tasks.type.done") }}</option>
				</select>

				<div class="submit">
					<button>{{ $t("tasks.modal.create-task") }}</button>
				</div>
			</form>
		</div>
		<div v-else>{{ $t("user-auth.not-logged-in") }}</div>
		<CloseIcon @click="this.$emit('close-create-task-modal')" />
	</div>
</template>

<script>
import CloseIcon from "./icons/CloseIcon.vue";

export default {
	name: "CreateTaskModal",
	components: { CloseIcon },
	data() {
		return {
			title: "",
			description: "",
			status: "",
		};
	},
	methods: {
		async handleSubmit() {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json", Authorization: "Bearer " + this.$myGlobalVariable.accessToken },
				body: JSON.stringify({ title: this.title, description: this.description, status: this.status }),
			};

			this.$emit("show-loading", true);

			await fetch(process.env.VUE_APP_BASE_URL + "/tasks", requestOptions).then((res) => console.log(res.json()));

			this.$emit("close-create-task-modal");
			this.$emit("show-loading", false);
		},
	},
};
</script>

<style></style>
