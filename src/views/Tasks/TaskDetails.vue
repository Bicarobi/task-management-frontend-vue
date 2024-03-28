<template>
	<div v-if="!this.$myGlobalVariable.username">Not logged in!</div>
	<div v-else-if="task">
		<h1>{{ task.title }}</h1>
		<p>{{ task.description }}</p>
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
		if (this.$myGlobalVariable.accessToken) {
			fetch(process.env.VUE_APP_BASE_URL + "/tasks/" + this.id, { headers: { Authorization: "Bearer " + this.$myGlobalVariable.accessToken } })
				.then((res) => res.json())
				.then((data) => (this.task = data))
				.catch((err) => console.log(err.message));
		}
	},
};
</script>
