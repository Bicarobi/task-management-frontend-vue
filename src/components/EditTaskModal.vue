<template>
	<div class="edit-task-modal-container">
		<div class="modal-content" v-if="this.$myGlobalVariable.username">
			<form @submit.prevent="handleSubmit">
				<label>{{ $t("tasks.modal.title") }}:</label>
				<input type="text" required v-model="editTitle" />

				<label>{{ $t("tasks.modal.description") }}:</label>
				<textarea
					type="text"
					onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
					onfocusout='this.style.height = "";'
					oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
					required
					v-model="editDescription"
				></textarea>

				<label>{{ $t("tasks.modal.status") }}:</label>
				<select required v-model="editStatus">
					<option value="OPEN">{{ $t("tasks.type.to-do") }}</option>
					<option value="IN_PROGRESS">{{ $t("tasks.type.in-progress") }}</option>
					<option value="DONE">{{ $t("tasks.type.done") }}</option>
				</select>

				<div class="submit">
					<button>{{ $t("tasks.modal.confirm-task") }}</button>
				</div>
			</form>
		</div>
		<div v-else>{{ $t("user-auth.not-logged-in") }}!</div>
		<CloseIcon @click="this.$emit('close-edit-task-modal')" />
	</div>
</template>

<script>
import CloseIcon from "./icons/CloseIcon.vue";

export default {
	name: "EditTaskModal",
	props: ["id", "title", "description", "status"],
	components: { CloseIcon },
	data() {
		return {
			editId: "",
			editTitle: "",
			editDescription: "",
			editStatus: "",
		};
	},
	methods: {
		async handleSubmit() {
			const requestOptions = {
				method: "PATCH",
				headers: { "Content-Type": "application/json", Authorization: "Bearer " + this.$myGlobalVariable.accessToken },
				body: JSON.stringify({ title: this.editTitle, description: this.editDescription, status: this.editStatus }),
			};

			this.$emit("show-loading", true);

			await fetch(process.env.VUE_APP_BASE_URL + "/tasks/" + this.editId, requestOptions).then((res) => console.log(res.json()));

			this.$emit("close-edit-task-modal");
			this.$emit("show-loading", false);
		},
	},
	watch: {
		id: {
			immediate: true,
			deep: true,
			handler(newVal) {
				this.editId = newVal;
			},
		},
		title: {
			immediate: true,
			deep: true,
			handler(newVal) {
				this.editTitle = newVal;
			},
		},
		description: {
			immediate: true,
			deep: true,
			handler(newVal) {
				this.editDescription = newVal;
			},
		},
		status: {
			immediate: true,
			deep: true,
			handler(newVal) {
				this.editStatus = newVal;
			},
		},
	},
};
</script>

<style></style>
