<template>
	<div class="tasks-container">
		<div class="current-page">Tasks</div>
		<div v-if="!this.$myGlobalVariable.username">Not logged in!</div>
		<div class="grid-container" v-else-if="tasks.length">
			<div class="grid-left-side">
				<div class="tasks-bar">
					<div class="tasks-type">To Do</div>
					<PlusIcon @click="openCreateTaskModal(true)" />
					<!-- <OptionsMenu :optionsOpened="this.optionsOpened" @click="openOptions"><div>Edit</div></OptionsMenu> -->
				</div>
				<!-- <div v-for="task in toDoTasks" :key="task.id" class="task">
					<router-link :to="{ name: 'taskDetails', params: { id: task.id } }">
						<h2>
							{{ task.title }}
						</h2>
					</router-link>
					@click="openModal(task.title, task.description)"
				</div> -->
				<TaskCard v-for="task in toDoTasks" :key="task.id" :title="task.title" :description="task.description" :status="task.status" />
			</div>
			<div class="grid-middle">
				<div class="tasks-bar">
					<div class="tasks-type">In Progress</div>
					<PlusIcon @click="openCreateTaskModal(true)" />
				</div>
				<TaskCard v-for="task in inProgressTasks" :key="task.id" :title="task.title" :description="task.description" :status="task.status" />
			</div>
			<div class="grid-right-side">
				<div class="tasks-bar">
					<div class="tasks-type">Done</div>
					<PlusIcon @click="openCreateTaskModal(true)" />
				</div>
				<TaskCard v-for="task in doneTasks" :key="task.id" :title="task.title" :description="task.description" :status="task.status" />
			</div>
		</div>
		<div v-else>
			<p>No Tasks Found</p>
		</div>
		<CreateTaskModal v-show="this.$myGlobalVariable.username && this.createTaskModalOpened" @close-create-task-modal="fetchTasks(), openCreateTaskModal(false)" />
		<!-- <TaskModal v-if="this.$myGlobalVariable.username && modalOpened == true" :title="modal.title" :description="modal.description" /> -->
	</div>
</template>

<script>
import TaskCard from "../../components/TaskCard.vue";
import TaskModal from "../../components/TaskModal.vue";
import OptionsMenu from "../../components/OptionsMenu.vue";
import CreateTaskModal from "../../components/CreateTaskModal.vue";

import PlusIcon from "../../components/icons/PlusIcon.vue";
import MoreIcon from "../../components/icons/MoreIcon.vue";

export default {
	name: "Tasks",
	components: {
		TaskCard,
		TaskModal,
		OptionsMenu,
		CreateTaskModal,
		PlusIcon,
		MoreIcon,
	},
	data() {
		return {
			tasks: [],
			modalOpened: false,
			optionsOpened: false,
			createTaskModalOpened: false,
			modal: { title: "", description: "" },
		};
	},
	computed: {
		toDoTasks() {
			return this.tasks.filter((task) => task.status == "OPEN");
		},
		inProgressTasks() {
			return this.tasks.filter((task) => task.status == "IN_PROGRESS");
		},
		doneTasks() {
			return this.tasks.filter((task) => task.status == "DONE");
		},
	},
	mounted() {
		this.fetchTasks();
	},
	methods: {
		fetchTasks() {
			if (this.$myGlobalVariable.accessToken) {
				fetch(process.env.VUE_APP_BASE_URL + "/tasks", { headers: { Authorization: "Bearer " + this.$myGlobalVariable.accessToken } })
					.then((res) => res.json())
					.then((data) => (this.tasks = data))
					.then(console.log(""))
					.catch((err) => console.log(err.message));
			}
		},
		openModal(title, description) {
			this.modalOpened = true;
			this.modal.title = title;
			this.modal.description = description;
		},
		openOptions() {
			this.optionsOpened = !this.optionsOpened;
		},
		openCreateTaskModal(isOpened) {
			this.createTaskModalOpened = isOpened;
		},
	},
};
</script>

<style>
.task h2 {
	background: #f4f4f4;
	padding: 20px;
	border-radius: 10px;
	margin: 10px auto;
	max-width: 600px;
	cursor: pointer;
	color: #444;
}

.task h2:hover {
	background: #ddd;
}

.task a {
	text-decoration: none;
}
</style>
