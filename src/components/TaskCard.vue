<template>
	<div class="task-card-container">
		<div class="task-card-bar">
			<OptionsMenu :optionsOpened="this.optionsOpened" @click="openOptions">
				<div @click="this.$emit('edit-task-modal-data')">{{ $t("tasks.modal.edit") }}</div>
				<div @click="deleteTask(id)">{{ $t("tasks.modal.delete") }}</div>
			</OptionsMenu>
		</div>
		<div class="task-card-content">
			<div class="task-title">{{ title }}</div>
			<div class="task-description">{{ description }}</div>
		</div>
	</div>
</template>

<script>
import OptionsMenu from "./OptionsMenu.vue";

export default {
	name: "TaskCard",
	props: ["id", "title", "description", "status"],
	components: {
		OptionsMenu,
	},
	data() {
		return {
			optionsOpened: false,
		};
	},
	methods: {
		openOptions() {
			this.optionsOpened = !this.optionsOpened;
		},
		async deleteTask(id) {
			const requestOptions = {
				method: "DELETE",
				headers: { Authorization: "Bearer " + this.$myGlobalVariable.accessToken },
			};

			await fetch(process.env.VUE_APP_BASE_URL + "/tasks/" + id, requestOptions);

			this.$emit("deleted-task");
		},
	},
};
</script>
