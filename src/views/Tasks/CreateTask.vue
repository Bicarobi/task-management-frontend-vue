<template>
	<div v-if="this.$myGlobalVariable.username">
		<form @submit.prevent="handleSubmit" v-on:keydown.enter.prevent>
			<label>Title:</label>
			<input type="text" required v-model="title" />

			<label>Description:</label>
			<input type="text" required v-model="description" />

			<div class="submit">
				<button>Create a Task</button>
			</div>
		</form>
		<div>{{ title }}</div>
		<div>{{ description }}</div>
	</div>
	<div v-else>Not logged in!</div>
</template>

<script>
export default {
	data() {
		return {
			title: "",
			description: "",
		};
	},
	methods: {
		handleSubmit() {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json", Authorization: "Bearer " + this.$myGlobalVariable.accessToken },
				body: JSON.stringify({ title: this.title, description: this.description }),
			};

			fetch("http://localhost:3000/tasks", requestOptions).then((res) => console.log(res.json()));
		},
	},
};
</script>

<style></style>
