<template>
	<div v-if="task">
		<h1>{{ task.title }}</h1>
		<p>The task id is {{ id }}</p>
		<p>{{ task.details }}</p>
	</div>
	<div v-else>
		<p>Loading task details...</p>
	</div>
</template>

<script>
export default {
	props: ["id"],
	data() {
		return {
			task: null,
		};
	},
	mounted() {
		fetch("http://localhost:3000/tasks/" + this.id, { headers: { Authorization: "Bearer " + localStorage.accessToken } })
			.then((res) => res.json())
			.then((data) => (this.task = data))
			.catch((err) => console.log(err.message));
	},
};
</script>
