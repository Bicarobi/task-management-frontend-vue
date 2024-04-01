<template>
	<div class="tasks-container">
		<div class="current-page">{{ $t("tasks.current-page") }}</div>
		<div v-if="!this.$myGlobalVariable.username">{{ $t("user-auth.not-logged-in") }}!</div>
		<div class="grid-container" v-else-if="tasks.length">
			<div class="grid-left-side">
				<div class="tasks-bar">
					<div class="tasks-type">{{ $t("tasks.type.to-do") }}</div>
					<PlusIcon @click="openCreateTaskModal(true)" />
				</div>
				<!-- <div v-for="task in toDoTasks" :key="task.id" class="task">
					<router-link :to="{ name: 'taskDetails', params: { id: task.id } }">
						<h2>
							{{ task.title }}
						</h2>
					</router-link>
					@click="openModal(task.title, task.description)"
				</div> -->
				<TaskCard
					v-for="task in toDoTasks"
					:key="task.id"
					:id="task.id"
					:title="task.title"
					:description="task.description"
					:status="task.status"
					@deleted-task="fetchTasks"
					@edit-task-modal-data="editTaskModalData(task.id, task.title, task.description, task.status)"
				/>
			</div>
			<div class="grid-middle">
				<div class="tasks-bar">
					<div class="tasks-type">{{ $t("tasks.type.in-progress") }}</div>
					<PlusIcon @click="openCreateTaskModal(true)" />
				</div>
				<TaskCard
					v-for="task in inProgressTasks"
					:key="task.id"
					:id="task.id"
					:title="task.title"
					:description="task.description"
					:status="task.status"
					@deleted-task="fetchTasks"
					@edit-task-modal-data="editTaskModalData(task.id, task.title, task.description, task.status)"
				/>
			</div>
			<div class="grid-right-side">
				<div class="tasks-bar">
					<div class="tasks-type">{{ $t("tasks.type.done") }}</div>
					<PlusIcon @click="openCreateTaskModal(true)" />
				</div>
				<TaskCard
					v-for="task in doneTasks"
					:key="task.id"
					:id="task.id"
					:title="task.title"
					:description="task.description"
					:status="task.status"
					@deleted-task="fetchTasks"
					@edit-task-modal-data="editTaskModalData(task.id, task.title, task.description, task.status)"
				/>
			</div>
		</div>
		<div class="no-tasks-container" v-else>
			<div>{{ $t("tasks.no-task-found") }}</div>
			<div class="create-task-container">
				<div>{{ $t("tasks.first-task") }}!</div>
				<PlusIcon @click="openCreateTaskModal(true)" />
			</div>
		</div>
		<CreateTaskModal v-if="this.$myGlobalVariable.username && this.createTaskModalOpened" @close-create-task-modal="fetchTasks(), openCreateTaskModal(false)" />
		<EditTaskModal
			v-if="this.$myGlobalVariable.username && this.editTaskModalOpened"
			@close-edit-task-modal="fetchTasks(), openEditTaskModal(false)"
			:id="this.editTaskId"
			:title="this.editTaskTitle"
			:description="this.editTaskDescription"
			:status="this.editTaskStatus"
		/>
		<!-- <TaskModal v-if="this.$myGlobalVariable.username && modalOpened == true" :title="modal.title" :description="modal.description" /> -->
	</div>
</template>

<script>
import TaskCard from "../../components/TaskCard.vue";
import TaskModal from "../../components/TaskModal.vue";
import CreateTaskModal from "../../components/CreateTaskModal.vue";
import EditTaskModal from "../../components/EditTaskModal.vue";

import PlusIcon from "../../components/icons/PlusIcon.vue";

export default {
	name: "Tasks",
	components: {
		TaskCard,
		TaskModal,
		CreateTaskModal,
		EditTaskModal,
		PlusIcon,
	},
	data() {
		return {
			tasks: [],
			modalOpened: false,
			createTaskModalOpened: false,
			editTaskModalOpened: false,
			editTaskId: null,
			editTaskTitle: null,
			editDescriptionId: null,
			editStatusId: null,

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
		async fetchTasks() {
			if (this.$myGlobalVariable.accessToken) {
				await fetch(process.env.VUE_APP_BASE_URL + "/tasks", { headers: { Authorization: "Bearer " + this.$myGlobalVariable.accessToken } }).then((res) => {
					if (!res.ok) {
						this.logOut();
					} else {
						res.json().then((data) => (this.tasks = data));
					}
				});
				/* .then((res) => res.json())
					.then((data) => (this.tasks = data))
					.catch((err) => console.log(err.message)); */
			}
		},
		logOut() {
			this.$myGlobalVariable.username = "";
			this.$myGlobalVariable.accessToken = "";
			localStorage.accessToken = "";
			localStorage.username = "";

			this.$router.push({ name: "signIn" });
		},
		openModal(title, description) {
			this.modalOpened = true;
			this.modal.title = title;
			this.modal.description = description;
		},
		openCreateTaskModal(isOpened) {
			this.createTaskModalOpened = isOpened;
		},
		editTaskModalData(id, title, description, status) {
			this.editTaskId = id;
			this.editTaskTitle = title;
			this.editTaskDescription = description;
			this.editTaskStatus = status;
			this.openEditTaskModal(true);
		},
		openEditTaskModal(isOpened) {
			this.editTaskModalOpened = isOpened;
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
