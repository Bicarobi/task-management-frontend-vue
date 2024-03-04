<template>
	<h1>Tasks</h1>
	<div v-if="tasks.length">
		<div v-for="task in tasks" :key="task.id" class="task">
			<router-link :to="{ name: 'taskDetails', params: { id: task.id } }">
				<h2>
					{{ task.title }}
				</h2>
			</router-link>
		</div>
	</div>
	<div v-else>
		<p>Loading tasks...</p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tasks: [],
			accessToken: null,
		};
	},
	mounted() {
		console.log("Bearer " + localStorage.accessToken);
		fetch("http://localhost:3000/tasks", { headers: { Authorization: "Bearer " + localStorage.accessToken } })
			.then((res) => res.json())
			.then((data) => (this.tasks = data))
			.catch((err) => console.log(err.message));
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
