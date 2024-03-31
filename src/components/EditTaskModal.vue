<template>
	<div class="edit-task-modal-container">
		<div class="modal-content" v-if="this.$myGlobalVariable.username">
			<form @submit.prevent="handleSubmit">
				<label>Title:</label>
				<input type="text" required v-model="editTitle" />

				<label>Description:</label>
				<textarea
					type="text"
					onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
					onfocusout='this.style.height = "";'
					oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
					required
					v-model="editDescription"
				></textarea>

				<label>Status:</label>
				<select required v-model="editStatus">
					<option value="OPEN">Open</option>
					<option value="IN_PROGRESS">In Progress</option>
					<option value="DONE">Done</option>
				</select>

				<div class="submit">
					<button>Confirm Changes</button>
				</div>
			</form>
		</div>
		<div v-else>Not logged in!</div>
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

			await fetch(process.env.VUE_APP_BASE_URL + "/tasks/" + this.editId, requestOptions).then((res) => console.log(res.json()));

			this.$emit("close-edit-task-modal");
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
