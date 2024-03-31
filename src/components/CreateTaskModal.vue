<template>
	<div class="create-task-modal-container">
		<div class="modal-content" v-if="this.$myGlobalVariable.username">
			<form @submit.prevent="handleSubmit" v-on:keydown.enter.prevent>
				<label>Title:</label>
				<input type="text" required v-model="title" />

				<label>Description:</label>
				<input type="text" required v-model="description" />

				<label>Status:</label>
				<select required v-model="status">
					<option value="OPEN">Open</option>
					<option value="IN_PROGRESS">In Progress</option>
					<option value="DONE">Done</option>
				</select>

				<div class="submit">
					<button>Create a Task</button>
				</div>
			</form>
		</div>
		<div v-else>Not logged in!</div>
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

			await fetch(process.env.VUE_APP_BASE_URL + "/tasks", requestOptions).then((res) => console.log(res.json()));

			this.$emit("close-create-task-modal");
		},
	},
};
</script>

<style></style>
